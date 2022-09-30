package ar.edu.unq.ttip.llegarafindemes.exceptions

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(code = HttpStatus.FORBIDDEN, reason = "User already exists")
class UserAlreadyExistsException(override val message: String? = "") : Exception(message)