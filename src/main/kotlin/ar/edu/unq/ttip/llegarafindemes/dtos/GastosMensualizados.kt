package ar.edu.unq.ttip.llegarafindemes.dtos

import ar.edu.unq.ttip.llegarafindemes.models.Gasto
import java.time.LocalDate

data class GastosMensualizados(val mes: LocalDate, val gastos: List<Gasto>) {
    var montoTotalDeGastos: Int = 0

    init { montoTotalDeGastos = gastos.stream().mapToInt { it.monto.toInt() }.sum() }
}