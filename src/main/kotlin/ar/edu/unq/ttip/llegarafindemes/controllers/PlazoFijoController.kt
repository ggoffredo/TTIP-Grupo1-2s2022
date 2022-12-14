package ar.edu.unq.ttip.llegarafindemes.controllers

import ar.edu.unq.ttip.llegarafindemes.models.PFijo
import ar.edu.unq.ttip.llegarafindemes.services.BcraScrapperService
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.ResponseStatus

@Controller
class PlazoFijoController(private val bcraService: BcraScrapperService) {

    @GetMapping(value = ["/plazosFijos"])
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    fun getPlazosFijos(): List<PFijo> {
        return bcraService.getAllPFOptions()
    }
}