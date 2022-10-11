package ar.edu.unq.ttip.llegarafindemes.controllers

import ar.edu.unq.ttip.llegarafindemes.models.Inversion
import ar.edu.unq.ttip.llegarafindemes.services.InversionesService
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.ResponseStatus

@Controller
class InversionesController(private val inversionesService: InversionesService) {

    @GetMapping(value = ["/inversiones"])
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    fun getInversiones(): HashMap<String, List<Inversion>> {
        return inversionesService.getInversiones()
    }
}