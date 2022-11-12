package ar.edu.unq.ttip.llegarafindemes.repositories

import ar.edu.unq.ttip.llegarafindemes.models.MedioDePago
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface MedioDePagoRepository : JpaRepository<MedioDePago, Int>