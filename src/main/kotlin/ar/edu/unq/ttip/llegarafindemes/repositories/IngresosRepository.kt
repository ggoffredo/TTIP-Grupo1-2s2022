package ar.edu.unq.ttip.llegarafindemes.repositories

import ar.edu.unq.ttip.llegarafindemes.models.Ingreso
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface IngresosRepository : JpaRepository<Ingreso, Int> {
    fun findByUsuarioId(userId: Int): List<Ingreso>
    fun findByUsuarioIdOrderByFechaAsc(userId: Int): List<Ingreso>
}