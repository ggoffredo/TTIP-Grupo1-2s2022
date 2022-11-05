package ar.edu.unq.ttip.llegarafindemes.services

import ar.edu.unq.ttip.llegarafindemes.exceptions.InvestmentNotFoundException
import ar.edu.unq.ttip.llegarafindemes.helpers.DateHelper
import ar.edu.unq.ttip.llegarafindemes.models.Ahorro
import ar.edu.unq.ttip.llegarafindemes.models.Inversion
import org.springframework.stereotype.Service
import java.time.LocalDate

@Service
class AhorrosService(
    private val gastosService: GastosService,
    private val ingresosService: IngresosService,
    private val inversionesService: InversionesService
) {

    fun getAhorros(userId: Int, cantidadDeMeses: Int = 1): List<Ahorro> {
        val today = LocalDate.now().withDayOfMonth(1)
        val from = today.minusMonths(cantidadDeMeses.toLong())
        val to = today.plusMonths(1)
        val ingresos = ingresosService.getIngresosForUserPerMonth(userId, from, to)
        val gastos = gastosService.getGastosForUserPerMonth(userId, from, to)
        // Si se persiste el valor en la db, acá podría obtenerse los ahorros para un mes determinado y partir de ahí
        var ahorroAcumulado = 0
        var mesesConIngresosOGastos = 0
        val ahorros = mutableListOf<Ahorro>()
        ingresos.zip(gastos).forEach {
                (ingreso, gasto) ->
                    val ahorroActual = ingreso.montoTotal - gasto.montoTotal
                    mesesConIngresosOGastos += if (ingreso.montoTotal != 0 || gasto.montoTotal != 0) 1 else 0
                    ahorroAcumulado += ahorroActual
                    ahorros.add(Ahorro(ingreso.mes, ahorroActual, ahorroAcumulado))
        }
        val promedioDeAhorros = ahorroAcumulado / mesesConIngresosOGastos
        DateHelper.getMonthsAsArray(to, to.plusMonths((cantidadDeMeses).toLong())).forEach {
            ahorroAcumulado += promedioDeAhorros
            ahorros.add(Ahorro(it, promedioDeAhorros, ahorroAcumulado))
        }
        return ahorros
    }

    fun getAhorrosConInversionAplicada(userId: Int, cantidadDeMeses: Int = 1, nombreDeInversion: String, invertirMesesFuturos: Boolean = true): List<Ahorro> {
        val inversiones = inversionesService.getInversiones().values.flatten()
        val inversion = inversiones.find { it.nombre == nombreDeInversion } ?: throw InvestmentNotFoundException()
        if (nombreDeInversion == "Plazo Fijo Uva") {
            return this.getAhorrosConInversionUva(userId, cantidadDeMeses, inversion, invertirMesesFuturos)
        }
        return this.doGetAhorrosConInversionAplicada(userId, cantidadDeMeses, inversion, invertirMesesFuturos)
    }

    private fun doGetAhorrosConInversionAplicada(userId: Int, cantidadDeMeses: Int = 1, inversion: Inversion, invertirMesesFuturos: Boolean): List<Ahorro> {
        var ahorroAcumulado = 0
        val ahorrosInvertidos = mutableListOf<Ahorro>()
        this.getAhorros(userId, cantidadDeMeses).forEach {
            if (invertirMesesFuturos && it.fecha < LocalDate.now().withDayOfMonth(1)) {
                ahorrosInvertidos.add(it)
                return@forEach
            }
            val nuevoAcumulado = (it.acumulado + ahorroAcumulado * (inversion.tasaDeVariacion / 100)).toInt()
            ahorroAcumulado += nuevoAcumulado
            ahorrosInvertidos.add(Ahorro(it.fecha, it.actual, nuevoAcumulado))
        }
        return ahorrosInvertidos
    }

    private fun getAhorrosConInversionUva(userId: Int, cantidadDeMeses: Int = 1, inversion: Inversion, invertirMesesFuturos: Boolean): List<Ahorro> {
        var contadorMeses = 0
        var intereses = 0
        var agregarIntereses = false
        val ahorrosInvertidos = mutableListOf<Ahorro>()
        this.getAhorros(userId, cantidadDeMeses).forEach {
            if (invertirMesesFuturos && it.fecha < LocalDate.now().withDayOfMonth(1)) {
                ahorrosInvertidos.add(it)
                return@forEach
            }
            if (contadorMeses == 0) {
                contadorMeses = 2
                if (agregarIntereses) {
                    val ahorro = Ahorro(it.fecha, it.actual, it.acumulado + intereses)
                    ahorrosInvertidos.add(ahorro)
                    intereses = (ahorro.acumulado * (inversion.tasaDeVariacion * 3) / 100).toInt()
                } else {
                    intereses = (it.acumulado * (inversion.tasaDeVariacion * 3) / 100).toInt()
                    ahorrosInvertidos.add(it)
                }
                agregarIntereses = true
            } else {
                ahorrosInvertidos.add(it)
                contadorMeses -= 1
            }
        }
        return ahorrosInvertidos
    }
}