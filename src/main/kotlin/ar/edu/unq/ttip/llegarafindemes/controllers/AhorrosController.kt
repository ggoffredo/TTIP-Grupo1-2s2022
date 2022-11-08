package ar.edu.unq.ttip.llegarafindemes.controllers

import ar.edu.unq.ttip.llegarafindemes.models.Ahorro
import ar.edu.unq.ttip.llegarafindemes.models.Ediciones
import ar.edu.unq.ttip.llegarafindemes.services.AhorrosService
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*

@Controller
class AhorrosController(private val ahorrosService: AhorrosService) {

    @GetMapping(value = ["/users/{userId}/ahorros"])
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    fun getAhorros(@PathVariable userId: Int, @RequestParam(name = "meses") cantidadDeMeses: Int?): List<Ahorro> {
        return ahorrosService.getAhorros(userId, cantidadDeMeses ?: 1)
    }

    @PostMapping(value = ["/users/{userId}/ahorros"])
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    fun getAhorrosAvanzado(
        @PathVariable userId: Int,
        @RequestParam(name = "meses") cantidadDeMeses: Int?,
        @RequestBody ediciones: Ediciones?
    ): List<Ahorro> {
        return ahorrosService.getAhorros(userId, cantidadDeMeses ?: 1, ediciones)
    }

    @GetMapping(value = ["/users/{userId}/ahorrosInvertidos"])
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    fun getAhorrosInvertidos(
        @PathVariable userId: Int,
        @RequestParam(name = "nombre") nombre: String,
        @RequestParam(name = "meses") cantidadDeMeses: Int?,
        @RequestParam(name = "proyecciones") proyecciones: Boolean
    ): List<Ahorro> {
        return ahorrosService.getAhorrosConInversionAplicada(userId, cantidadDeMeses ?: 1, nombre,proyecciones)
    }

    @PostMapping(value = ["/users/{userId}/ahorrosInvertidos"])
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    fun getAhorrosInvertidosAvanzado(
        @PathVariable userId: Int,
        @RequestParam(name = "nombre") nombre: String,
        @RequestParam(name = "meses") cantidadDeMeses: Int?,
        @RequestBody ediciones: Ediciones?
    ): List<Ahorro> {
        return ahorrosService.getAhorrosConInversionAplicada(userId, cantidadDeMeses ?: 1, nombre, true, ediciones)
    }
}