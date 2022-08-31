package ar.edu.unq.ttip.llegarafindemes.controllers

import ar.edu.unq.ttip.llegarafindemes.models.gastos.Gasto
import ar.edu.unq.ttip.llegarafindemes.services.GastosService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
import java.time.LocalDate

@Controller
class GastosController {

    @Autowired
    private lateinit var gastosService: GastosService

    @GetMapping(value = ["/user/{userId}/gastos"])
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    fun getGastosForUser(@PathVariable userId: Int, @RequestParam date: LocalDate?): List<Gasto> {
        return gastosService.getGastosForUser(userId, date)
    }
}