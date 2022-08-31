package ar.edu.unq.ttip.llegarafindemes.services

import ar.edu.unq.ttip.llegarafindemes.models.ingresos.Ingreso
import ar.edu.unq.ttip.llegarafindemes.repositories.IngresosFijosRepository
import ar.edu.unq.ttip.llegarafindemes.repositories.IngresosOcasionalesRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.time.LocalDate

@Service
class IngresosService {

    @Autowired
    private lateinit var ingresosFijosRepository: IngresosFijosRepository
    @Autowired
    private lateinit var ingresosOcasionalesRepository: IngresosOcasionalesRepository

    fun getIngresosForUser(userdId: Int, date: LocalDate?): List<Ingreso> {
        val gastosFijos = ingresosFijosRepository.findByUsuarioId(userdId)
        val gastosOcasionales = ingresosOcasionalesRepository.findByUsuarioId(userdId)
        return gastosFijos + gastosOcasionales
    }
}