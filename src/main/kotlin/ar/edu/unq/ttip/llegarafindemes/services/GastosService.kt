package ar.edu.unq.ttip.llegarafindemes.services

import ar.edu.unq.ttip.llegarafindemes.dtos.GastoDto
import ar.edu.unq.ttip.llegarafindemes.dtos.GastosMensualizados
import ar.edu.unq.ttip.llegarafindemes.models.Gasto
import ar.edu.unq.ttip.llegarafindemes.repositories.GastosRepository
import org.springframework.stereotype.Service
import java.time.LocalDate

@Service
class GastosService(
    private val gastosRepository: GastosRepository,
    private val administrablesService: AdministrablesService,
    private val userService: UserService,
    private val medioDePagoService: MedioDePagoService
) {

    fun getGastosForUser(userId: Int): List<Gasto> {
        return gastosRepository.findByUsuarioIdOrderByFechaAscDescripcionAsc(userId)
    }

    fun getGastosForUserPerMonth(userId: Int, from: LocalDate? = null, to: LocalDate? = null): List<GastosMensualizados> {
        val gastos = gastosRepository.findByUsuarioIdOrderByFechaAscDescripcionAsc(userId)
        return administrablesService.getAdministrablesPerMonth(gastos, from, to).mapToGastosMensualizados()
    }

    fun createGastoForUser(userId: Int, gastoDto: GastoDto): Gasto {
        val user = userService.getUser(userId)
        val medioDePago = medioDePagoService.getMedioDePago(2)
        return gastosRepository.save(gastoDto.createGasto(user, medioDePago))
    }
}