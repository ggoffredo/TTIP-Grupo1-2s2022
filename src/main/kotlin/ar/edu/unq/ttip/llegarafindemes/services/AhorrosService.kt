package ar.edu.unq.ttip.llegarafindemes.services

import ar.edu.unq.ttip.llegarafindemes.helpers.DateHelper
import ar.edu.unq.ttip.llegarafindemes.models.Ahorro
import org.springframework.stereotype.Service
import java.time.LocalDate

@Service
class AhorrosService(private val gastosService: GastosService, private val ingresosService: IngresosService) {

    fun getAhorros(userId: Int, cantidadDeMeses: Int = 1): List<Ahorro> {
        val today = LocalDate.now().withDayOfMonth(1)
        val from = today.minusMonths(cantidadDeMeses.toLong())
        val to = today.plusMonths(1)
        val ingresos = ingresosService.getIngresosForUserPerMonth(userId, from, to)
        val gastos = gastosService.getGastosForUserPerMonth(userId, from, to)
        // Si se persiste el valor en la db, acá podría obtenerse los ahorros para un mes determinado y partir de ahí
        var ahorroAcumulado = 0
        var mesesConIngresosOGastos = 0
        val ahorros = ingresos.zip(gastos).map {
                (ingreso, gasto) ->
                    val ahorroActual = ingreso.montoTotal - gasto.montoTotal
                    mesesConIngresosOGastos += if (ingreso.montoTotal != 0 || gasto.montoTotal != 0) 1 else 0
                    ahorroAcumulado += ahorroActual
                    Ahorro(ingreso.mes, ahorroActual, ahorroAcumulado)
        }.toMutableList()
        val promedioDeAhorros = ahorroAcumulado / mesesConIngresosOGastos
        val ahorrosProyectados = DateHelper.getMonthsAsArray(to, to.plusMonths((cantidadDeMeses-1).toLong())).map {
            ahorroAcumulado += promedioDeAhorros
            Ahorro(it, promedioDeAhorros, ahorroAcumulado)
        }
        ahorros.addAll(ahorrosProyectados)
        return ahorros
    }
}