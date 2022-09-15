package ar.edu.unq.ttip.llegarafindemes.dtos

import ar.edu.unq.ttip.llegarafindemes.models.Administrable
import java.time.LocalDate

open class AdministrablesMensualizados(open val mes: LocalDate, open val administrables: List<Administrable>) {
    var montoTotal: Int = 0

    fun setMontoTotal() {
        montoTotal = administrables.stream().mapToInt { it.monto }.sum()
    }
}