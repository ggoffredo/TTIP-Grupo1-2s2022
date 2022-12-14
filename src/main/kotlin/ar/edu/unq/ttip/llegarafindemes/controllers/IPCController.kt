package ar.edu.unq.ttip.llegarafindemes.controllers

import ar.edu.unq.ttip.llegarafindemes.models.Ipc
import ar.edu.unq.ttip.llegarafindemes.services.BcraApiService
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.ResponseStatus

@Controller
class IPCController(private val bcraApiService: BcraApiService) {

    @GetMapping(value = ["/ipc"])
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    fun getIPC(): Ipc {
        return bcraApiService.getLastMonthIPC()
    }

    @GetMapping(value = ["/ipcMensuales"])
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    fun getIPCMensuales(): List<Ipc> {
        return bcraApiService.getIPCByMonth()
    }

    @GetMapping(value = ["/inflacionEsperada"])
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    fun getInflacionEsperada(): String {
        return bcraApiService.getInflacionEsperada()
    }
}