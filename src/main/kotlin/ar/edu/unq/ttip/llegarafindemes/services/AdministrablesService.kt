package ar.edu.unq.ttip.llegarafindemes.services

import ar.edu.unq.ttip.llegarafindemes.dtos.GastosMensualizados
import ar.edu.unq.ttip.llegarafindemes.dtos.IngresosMensualizados
import ar.edu.unq.ttip.llegarafindemes.models.Administrable
import org.springframework.stereotype.Service
import java.time.LocalDate
import java.time.temporal.ChronoUnit
import java.util.stream.Collectors
import java.util.stream.Stream

@Service
class AdministrablesService {
    private var monthsToCalculate = mutableListOf<LocalDate>()
    private lateinit var administrables : List<Administrable>

    fun getAdministrablesPerMonth(administrables: List<Administrable>): AdministrablesService {
        this.administrables = administrables
        if (this.administrables.isEmpty()) return this
        val administrableMasViejo = this.administrables.first()
        val fechaInicial = administrableMasViejo.fecha
        val fechaFinal = LocalDate.now().plusMonths(1)
        this.monthsToCalculate = Stream
            .iterate(
                fechaInicial.withDayOfMonth(1)
            ) { date: LocalDate -> date.plusMonths(1) }
            .limit(ChronoUnit.MONTHS.between(fechaInicial, fechaFinal))
            .collect(Collectors.toList())
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