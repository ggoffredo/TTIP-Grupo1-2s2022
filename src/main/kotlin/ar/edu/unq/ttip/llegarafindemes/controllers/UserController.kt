package ar.edu.unq.ttip.llegarafindemes.controllers

import ar.edu.unq.ttip.llegarafindemes.models.Usuario
import ar.edu.unq.ttip.llegarafindemes.services.UserService
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
import java.util.*

@Controller
class UserController(private val userService: UserService) {

    @PostMapping(value = ["/login"])
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    fun login(@RequestHeader("authorization") auth: String): Usuario {
        val (username, password) = String(Base64.getUrlDecoder().decode(auth.split(" ")[1])).split(":")
        return userService.login(username, password)
    }
}