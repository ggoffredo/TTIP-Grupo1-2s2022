package ar.edu.unq.ttip.llegarafindemes.repositories

import ar.edu.unq.ttip.llegarafindemes.models.Usuario
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface UserRepository : JpaRepository<Usuario, Int> {
    fun findByEmailAndPassword(email: String, password: String) : Optional<Usuario>
}