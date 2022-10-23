package ar.edu.unq.ttip.llegarafindemes.services

import ar.edu.unq.ttip.llegarafindemes.models.Ahorro
import org.springframework.stereotype.Service
import java.time.LocalDate

@Service
class AhorrosService(private val gastosService: GastosService, private val ingresosService: IngresosService) {

    fun getAhorros(userId: Int, cantidadDeMeses: Int = 1): List<Ahorro> {
        val today = LocalDate.now().withDayOfMonth(1)
        val ingresos = ingresosService.getIngresosForUserPerMonth(userId, today.minusMonths(cantidadDeMeses.toLong()), today.plusMonths(cantidadDeMeses.toLong()))
        val gastos = gastosService.getGastosForUserPerMonth(userId, today.minusMonths(cantidadDeMeses.toLong()), today.plusMonths(cantidadDeMeses.toLong()))
        // Si se persiste el valor en la db, acá podría obtenerse los ahorros para un mes determinado y partir de ahí
        var ahorroAcumulado = 0
        return ingresos.zip(gastos).map {
                (ingreso, gasto) ->
                    val ahorroActual = ingreso.montoTotal - gasto.montoTotal
                    ahorroAcumulado += ahorroActual
                    Ahorro(ingreso.mes, ahorroActual, ahorroAcumulado)
        }
    }
}