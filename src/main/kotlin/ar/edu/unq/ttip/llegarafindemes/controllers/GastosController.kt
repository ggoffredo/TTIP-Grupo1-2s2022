package ar.edu.unq.ttip.llegarafindemes.controllers

import ar.edu.unq.ttip.llegarafindemes.dtos.GastosMensualizados
import ar.edu.unq.ttip.llegarafindemes.models.Gasto
import ar.edu.unq.ttip.llegarafindemes.services.GastosService
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.ResponseStatus

@Controller
class GastosController(private val gastosService: GastosService) {

    @GetMapping(value = ["/users/{userId}/gastos"])
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    fun getGastosForUser(@PathVariable userId: Int): List<Gasto> {
        return gastosService.getGastosForUser(userId)
    }

    @GetMapping(value = ["/users/{userId}/gastosMensualizados"])
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    fun getGastosForUserPerMonth(@PathVariable userId: Int): List<GastosMensualizados> {
        return gastosService.getGastosForUserPerMonth(userId)
    }
}