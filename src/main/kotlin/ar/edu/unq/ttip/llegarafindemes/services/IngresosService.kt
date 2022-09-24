package ar.edu.unq.ttip.llegarafindemes.services

import ar.edu.unq.ttip.llegarafindemes.dtos.IngresosMensualizados
import ar.edu.unq.ttip.llegarafindemes.models.Ingreso
import ar.edu.unq.ttip.llegarafindemes.repositories.IngresosRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.time.LocalDate

@Service
class IngresosService {

    @Autowired
    private lateinit var ingresosRepository: IngresosRepository
    @Autowired
    private lateinit var administrablesService: AdministrablesService

    fun getIngresosForUser(userdId: Int): List<Ingreso> {
        return ingresosRepository.findByUsuarioId(userdId)
    }

    fun getIngresosForUserPerMonth(userdId: Int): List<IngresosMensualizados> {
        val ingresos = ingresosRepository.findByUsuarioIdOrderByFechaAsc(userdId)
        return administrablesService.getAdministrablesPerMonth(ingresos).mapToIngresosMensualizados()
    }
}