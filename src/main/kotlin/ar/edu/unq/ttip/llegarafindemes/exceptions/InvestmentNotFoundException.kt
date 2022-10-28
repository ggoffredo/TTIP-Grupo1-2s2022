package ar.edu.unq.ttip.llegarafindemes.exceptions

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Investment not found")
class InvestmentNotFoundException(override val message: String? = "") : Exception(message)