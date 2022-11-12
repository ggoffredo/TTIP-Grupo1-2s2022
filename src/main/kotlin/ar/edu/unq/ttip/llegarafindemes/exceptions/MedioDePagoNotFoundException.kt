package ar.edu.unq.ttip.llegarafindemes.exceptions

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Medio de pago not found")
class MedioDePagoNotFoundException(override val message: String? = "") : Exception(message)