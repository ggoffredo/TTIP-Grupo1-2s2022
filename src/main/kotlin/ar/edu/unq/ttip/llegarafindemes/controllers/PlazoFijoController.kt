package ar.edu.unq.ttip.llegarafindemes.controllers

import ar.edu.unq.ttip.llegarafindemes.models.PFijo
import ar.edu.unq.ttip.llegarafindemes.services.BCRAService
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*

@Controller
class PlazoFijoController(private val bcraService: BCRAService) {

    @GetMapping(value = ["/plazosFijos"])
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    fun getPlazosFijos(): List<PFijo> {
        return bcraService.getAllPFOptions()
    }
}