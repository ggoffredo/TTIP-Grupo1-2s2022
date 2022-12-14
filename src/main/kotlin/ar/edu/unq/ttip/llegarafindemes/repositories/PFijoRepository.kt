package ar.edu.unq.ttip.llegarafindemes.repositories

import ar.edu.unq.ttip.llegarafindemes.models.PFijo
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface PFijoRepository : JpaRepository<PFijo, Int> {
}