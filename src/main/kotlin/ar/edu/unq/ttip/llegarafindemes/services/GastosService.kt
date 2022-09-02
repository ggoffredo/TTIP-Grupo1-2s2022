package ar.edu.unq.ttip.llegarafindemes.services

import ar.edu.unq.ttip.llegarafindemes.models.Gasto
import ar.edu.unq.ttip.llegarafindemes.repositories.GastosRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.time.LocalDate

@Service
class GastosService {

    @Autowired
    private lateinit var gastosRepository: GastosRepository

    fun getGastosForUser(userdId: Int, date: LocalDate?): List<Gasto> {
        return gastosRepository.findByUsuarioId(userdId)
    }
}