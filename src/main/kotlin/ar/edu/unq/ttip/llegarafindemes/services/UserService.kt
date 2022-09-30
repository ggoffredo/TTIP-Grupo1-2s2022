package ar.edu.unq.ttip.llegarafindemes.services

import ar.edu.unq.ttip.llegarafindemes.exceptions.UserAlreadyExistsException
import ar.edu.unq.ttip.llegarafindemes.exceptions.UserNotFoundException
import ar.edu.unq.ttip.llegarafindemes.models.Usuario
import ar.edu.unq.ttip.llegarafindemes.repositories.UserRepository
import org.springframework.stereotype.Service
import kotlin.jvm.Throws

@Service
class UserService(private val userRepository: UserRepository) {

    @Throws(UserNotFoundException::class)
    fun login(email: String, password: String): Usuario {
        return userRepository.findByEmailAndPassword(email, password).orElseThrow{ UserNotFoundException() }
    }

    @Throws(UserNotFoundException::class)
    fun getUser(userId: Int): Usuario {
        return userRepository.findById(userId).orElseThrow{ UserNotFoundException() }
    }

    fun register(user: Usuario): Usuario {
        userRepository.findByEmail(user.email).ifPresent{ throw UserAlreadyExistsException() }
        return userRepository.save(user)
    }
}