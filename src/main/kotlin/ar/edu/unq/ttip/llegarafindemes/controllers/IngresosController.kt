package ar.edu.unq.ttip.llegarafindemes.controllers

import ar.edu.unq.ttip.llegarafindemes.models.ingresos.Ingreso
import ar.edu.unq.ttip.llegarafindemes.services.IngresosService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
import java.time.LocalDate

@Controller
class IngresosController {

    @Autowired
    private lateinit var ingresosService: IngresosService

    @GetMapping(value = ["/user/{userId}/ingresos"])
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    fun getGastosForUser(@PathVariable userId: Int, @RequestParam date: LocalDate?): List<Ingreso> {
        return ingresosService.getIngresosForUser(userId, date)
    }
}