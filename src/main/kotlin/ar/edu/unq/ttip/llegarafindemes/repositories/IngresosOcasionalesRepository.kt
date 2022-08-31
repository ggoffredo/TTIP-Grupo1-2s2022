package ar.edu.unq.ttip.llegarafindemes.repositories

import ar.edu.unq.ttip.llegarafindemes.models.ingresos.IngresoOcasional
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface IngresosOcasionalesRepository : JpaRepository<IngresoOcasional, Int> {
    fun findByUsuarioId(userId: Int): List<IngresoOcasional>
}