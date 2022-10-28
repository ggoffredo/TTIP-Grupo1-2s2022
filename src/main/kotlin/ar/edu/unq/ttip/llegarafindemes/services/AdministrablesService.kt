package ar.edu.unq.ttip.llegarafindemes.services

import ar.edu.unq.ttip.llegarafindemes.dtos.GastosMensualizados
import ar.edu.unq.ttip.llegarafindemes.dtos.IngresosMensualizados
import ar.edu.unq.ttip.llegarafindemes.helpers.DateHelper
import ar.edu.unq.ttip.llegarafindemes.models.Administrable
import org.springframework.stereotype.Service
import java.time.LocalDate

@Service
class AdministrablesService {
    private var monthsToCalculate = mutableListOf<LocalDate>()
    private var administrables = listOf<Administrable>()

    fun getAdministrablesPerMonth(administrables: List<Administrable>, from: LocalDate? = null, to: LocalDate? = null): AdministrablesService {
        this.administrables = administrables
        if (this.administrables.isEmpty()) return this
        val fechaAdministrableMasViejo = this.administrables.first().fecha.withDayOfMonth(1)
        val fechaInicial = from ?: fechaAdministrableMasViejo
        val fechaFinal = to ?: LocalDate.now().plusMonths(1)
        this.monthsToCalculate = DateHelper.getMonthsAsArray(fechaInicial, fechaFinal)
        return this
    }

    fun mapToGastosMensualizados() : List<GastosMensualizados> {
        return monthsToCalculate.map{
            month: LocalDate -> GastosMensualizados(
                month,
                this.getAdministrablesForMonth(month, this.administrables)
            )
        }
    }

    fun mapToIngresosMensualizados() : List<IngresosMensualizados> {
        return monthsToCalculate.map{
            month: LocalDate -> IngresosMensualizados(
                month,
                this.getAdministrablesForMonth(month, this.administrables)
            )
        }
    }

    private fun getAdministrablesForMonth(month: LocalDate, administrables: List<Administrable>): List<Administrable> {
        return administrables.filter { administrable: Administrable ->  administrable.correspondsToMonth(month) }
    }
}