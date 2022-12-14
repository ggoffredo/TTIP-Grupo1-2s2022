package ar.edu.unq.ttip.llegarafindemes.dtos

import ar.edu.unq.ttip.llegarafindemes.models.Administrable
import com.fasterxml.jackson.annotation.JsonProperty
import java.time.LocalDate

class GastosMensualizados(
    override val mes: LocalDate,
    @JsonProperty("gastos") override val administrables: List<Administrable>
) : AdministrablesMensualizados(mes, administrables) {

    init { this.setMontoTotal() }
}