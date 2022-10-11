package ar.edu.unq.ttip.llegarafindemes.controllers

import ar.edu.unq.ttip.llegarafindemes.models.Cotizacion
import ar.edu.unq.ttip.llegarafindemes.services.CotizacionesService
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.ResponseStatus

@Controller
class CotizacionesController(private val cotizacionesApiService: CotizacionesService) {

    @GetMapping(value = ["/cotizacionDolares"])
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    fun getCotizacionDolares(): List<Cotizacion> {
        return cotizacionesApiService.getDolares()
    }
}