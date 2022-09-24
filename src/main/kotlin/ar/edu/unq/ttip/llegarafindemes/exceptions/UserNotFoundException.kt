package ar.edu.unq.ttip.llegarafindemes.exceptions

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "User not found")
class UserNotFoundException(override val message: String? = "") : Exception(message)