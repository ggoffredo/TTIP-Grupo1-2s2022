package ar.edu.unq.ttip.llegarafindemes.repositories

import ar.edu.unq.ttip.llegarafindemes.models.ingresos.IngresoFijo
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface IngresosFijosRepository : JpaRepository<IngresoFijo, Int> {
    fun findByUsuarioId(userId: Int): List<IngresoFijo>
}