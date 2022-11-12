package ar.edu.unq.ttip.llegarafindemes.services

import ar.edu.unq.ttip.llegarafindemes.dtos.IngresoDto
import ar.edu.unq.ttip.llegarafindemes.dtos.IngresosMensualizados
import ar.edu.unq.ttip.llegarafindemes.models.Ingreso
import ar.edu.unq.ttip.llegarafindemes.repositories.IngresosRepository
import org.springframework.stereotype.Service
import java.time.LocalDate

@Service
class IngresosService(
    private val ingresosRepository: IngresosRepository,
    private val administrablesService: AdministrablesService,
    private val userService: UserService
) {

    fun getIngresosForUser(userId: Int): List<Ingreso> {
        return ingresosRepository.findByUsuarioId(userId)
    }

    fun getIngresosForUserPerMonth(userId: Int, from: LocalDate? = null, to: LocalDate? = null): List<IngresosMensualizados> {
        val ingresos = ingresosRepository.findByUsuarioIdOrderByFechaAsc(userId)
        return administrablesService.getAdministrablesPerMonth(ingresos, from, to).mapToIngresosMensualizados()
    }

    fun createIngresoForUser(userId: Int, ingresoDto: IngresoDto): Ingreso {
        val user = userService.getUser(userId)
        return ingresosRepository.save(ingresoDto.createIngreso(user))
    }
}