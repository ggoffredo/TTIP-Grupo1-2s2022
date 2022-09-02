package ar.edu.unq.ttip.llegarafindemes.services

import ar.edu.unq.ttip.llegarafindemes.models.Ingreso
import ar.edu.unq.ttip.llegarafindemes.repositories.IngresosRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.time.LocalDate

@Service
class IngresosService {

    @Autowired
    private lateinit var ingresosRepository: IngresosRepository

    fun getIngresosForUser(userdId: Int, date: LocalDate?): List<Ingreso> {
        return ingresosRepository.findByUsuarioId(userdId)
    }
}