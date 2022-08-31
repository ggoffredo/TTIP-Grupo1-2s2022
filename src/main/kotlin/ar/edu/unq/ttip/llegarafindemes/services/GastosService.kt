package ar.edu.unq.ttip.llegarafindemes.services

import ar.edu.unq.ttip.llegarafindemes.models.gastos.Gasto
import ar.edu.unq.ttip.llegarafindemes.repositories.GastosFijosRepository
import ar.edu.unq.ttip.llegarafindemes.repositories.GastosOcasionalesRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.time.LocalDate

@Service
class GastosService {

    @Autowired
    private lateinit var gastosFijosRepository: GastosFijosRepository
    @Autowired
    private lateinit var gastosOcasionalesRepository: GastosOcasionalesRepository

    fun getGastosForUser(userdId: Int, date: LocalDate?): List<Gasto> {
        val gastosFijos = gastosFijosRepository.findByUsuarioId(userdId)
        val gastosOcasionales = gastosOcasionalesRepository.findByUsuarioId(userdId)
        return gastosFijos + gastosOcasionales
    }
}