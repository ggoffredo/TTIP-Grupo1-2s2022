package ar.edu.unq.ttip.llegarafindemes.services

import ar.edu.unq.ttip.llegarafindemes.dtos.GastosMensualizados
import ar.edu.unq.ttip.llegarafindemes.models.Gasto
import ar.edu.unq.ttip.llegarafindemes.repositories.GastosRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.time.LocalDate
import java.time.temporal.ChronoUnit
import java.util.stream.Collectors
import java.util.stream.Stream

@Service
class GastosService {

    @Autowired
    private lateinit var gastosRepository: GastosRepository

    fun getGastosForUser(userdId: Int): List<Gasto> {
        return gastosRepository.findByUsuarioId(userdId)
    }

    fun getGastosForUserPerMonth(userdId: Int): List<GastosMensualizados> {
        val gastos = gastosRepository.findByUsuarioIdOrderByFechaAsc(userdId)
        val gastoMasViejo = gastos.first()
        val fechaInicial = gastoMasViejo.fecha
        val fechaFinal = LocalDate.now()
        val monthsToCalculate = Stream
            .iterate(
                fechaInicial.withDayOfMonth(1)
            ) { date: LocalDate -> date.plusMonths(1) }
            .limit(ChronoUnit.MONTHS.between(fechaInicial, fechaFinal))
            .collect(Collectors.toList())
        return monthsToCalculate.map{
                month: LocalDate -> GastosMensualizados(
                    month,
                    this.getGastosForMonth(month, gastos)
                )
        }
    }

    private fun getGastosForMonth(month: LocalDate, gastos: List<Gasto>): List<Gasto> {
        return gastos.filter { gasto: Gasto ->  gasto.correspondsToMonth(month) }
    }
}