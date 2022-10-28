package ar.edu.unq.ttip.llegarafindemes.services

import ar.edu.unq.ttip.llegarafindemes.dtos.GastosMensualizados
import ar.edu.unq.ttip.llegarafindemes.models.Gasto
import ar.edu.unq.ttip.llegarafindemes.repositories.GastosRepository
import org.springframework.stereotype.Service
import java.time.LocalDate

@Service
class GastosService(private val gastosRepository: GastosRepository, private val administrablesService: AdministrablesService) {

    fun getGastosForUser(userId: Int): List<Gasto> {
        return gastosRepository.findByUsuarioId(userId)
    }

    fun getGastosForUserPerMonth(userId: Int, from: LocalDate? = null, to: LocalDate? = null): List<GastosMensualizados> {
        val gastos = gastosRepository.findByUsuarioIdOrderByFechaAsc(userId)
        return administrablesService.getAdministrablesPerMonth(gastos, from, to).mapToGastosMensualizados()
    }
}