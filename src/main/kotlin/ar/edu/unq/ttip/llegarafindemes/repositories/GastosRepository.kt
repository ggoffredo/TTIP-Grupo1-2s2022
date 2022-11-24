package ar.edu.unq.ttip.llegarafindemes.repositories

import ar.edu.unq.ttip.llegarafindemes.models.Gasto
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface GastosRepository : JpaRepository<Gasto, Int> {
    fun findByUsuarioIdOrderByFechaAscDescripcionAsc(userId: Int): List<Gasto>
}