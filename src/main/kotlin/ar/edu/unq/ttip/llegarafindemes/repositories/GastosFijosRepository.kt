package ar.edu.unq.ttip.llegarafindemes.repositories

import ar.edu.unq.ttip.llegarafindemes.models.gastos.GastoFijo
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface GastosFijosRepository : JpaRepository<GastoFijo, Int> {
    fun findByUsuarioId(userId: Int): List<GastoFijo>
}