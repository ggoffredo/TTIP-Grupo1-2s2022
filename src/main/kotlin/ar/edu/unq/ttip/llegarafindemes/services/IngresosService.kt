package ar.edu.unq.ttip.llegarafindemes.services

import ar.edu.unq.ttip.llegarafindemes.dtos.IngresosMensualizados
import ar.edu.unq.ttip.llegarafindemes.models.Ingreso
import ar.edu.unq.ttip.llegarafindemes.repositories.IngresosRepository
import org.springframework.stereotype.Service

@Service
class IngresosService(private val ingresosRepository: IngresosRepository, private val administrablesService: AdministrablesService) {

    fun getIngresosForUser(userdId: Int): List<Ingreso> {
        return ingresosRepository.findByUsuarioId(userdId)
    }

    fun getIngresosForUserPerMonth(userdId: Int): List<IngresosMensualizados> {
        val ingresos = ingresosRepository.findByUsuarioIdOrderByFechaAsc(userdId)
        return administrablesService.getAdministrablesPerMonth(ingresos).mapToIngresosMensualizados()
    }
}