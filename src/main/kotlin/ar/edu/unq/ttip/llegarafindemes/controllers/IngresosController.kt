package ar.edu.unq.ttip.llegarafindemes.controllers

import ar.edu.unq.ttip.llegarafindemes.dtos.IngresoDto
import ar.edu.unq.ttip.llegarafindemes.dtos.IngresosMensualizados
import ar.edu.unq.ttip.llegarafindemes.models.Ingreso
import ar.edu.unq.ttip.llegarafindemes.services.IngresosService
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*

@Controller
class IngresosController(private val ingresosService: IngresosService) {

    @GetMapping(value = ["/users/{userId}/ingresos"])
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    fun getIngresosForUser(@PathVariable userId: Int): List<Ingreso> {
        return ingresosService.getIngresosForUser(userId)
    }

    @GetMapping(value = ["/users/{userId}/ingresosMensualizados"])
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    fun getIngresosForUserPerMonth(@PathVariable userId: Int): List<IngresosMensualizados> {
        return ingresosService.getIngresosForUserPerMonth(userId)
    }

    @PostMapping(value = ["/users/{userId}/ingresos"])
    @ResponseBody
    @ResponseStatus(HttpStatus.CREATED)
    fun createIngresoForUser(@PathVariable userId: Int, @RequestBody ingreso: IngresoDto): Ingreso {
        return ingresosService.createIngresoForUser(userId, ingreso)
    }
}