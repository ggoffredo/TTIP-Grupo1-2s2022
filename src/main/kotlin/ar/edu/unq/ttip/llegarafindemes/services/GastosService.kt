package ar.edu.unq.ttip.llegarafindemes.services

import ar.edu.unq.ttip.llegarafindemes.dtos.GastosMensualizados
import ar.edu.unq.ttip.llegarafindemes.models.Gasto
import ar.edu.unq.ttip.llegarafindemes.repositories.GastosRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class GastosService {

    @Autowired
    private lateinit var gastosRepository: GastosRepository
    @Autowired
    private lateinit var administrablesService: AdministrablesService

    fun getGastosForUser(userdId: Int): List<Gasto> {
        return gastosRepository.findByUsuarioId(userdId)
    }

    fun getGastosForUserPerMonth(userdId: Int): List<GastosMensualizados> {
        val gastos = gastosRepository.findByUsuarioIdOrderByFechaAsc(userdId)
        return administrablesService.getAdministrablesPerMonth(gastos).mapToGastosMensualizados()
    }
}