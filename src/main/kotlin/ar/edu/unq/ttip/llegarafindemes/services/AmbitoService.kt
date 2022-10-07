package ar.edu.unq.ttip.llegarafindemes.services

import ar.edu.unq.ttip.llegarafindemes.helpers.RestTemplateHelper
import ar.edu.unq.ttip.llegarafindemes.models.Inversion
import ar.edu.unq.ttip.llegarafindemes.models.Periodicidad
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

@Service
class AmbitoService {

    @Value("\${ambito.api.dolar-mep-url}")
    private val DOLAR_MEP_URL = ""
    @Value("\${ambito.api.dolar-ahorro-url}")
    private val DOLAR_AHORRO_URL = ""

    fun getDolarBolsaAsInversion(): Inversion {
        val rate = this.getRateFrom(DOLAR_MEP_URL)
        return Inversion("Dolar Bolsa", rate, Periodicidad.MENSUAL, 1, "Dolar")
    }

    fun getDolarAhorroAsInversion(): Inversion {
        val rate = this.getRateFrom(DOLAR_AHORRO_URL)
        return Inversion("Dolar Ahorro", rate, Periodicidad.MENSUAL, 1, "Dolar")
    }

    private fun getRateFrom(url: String): Float {
        val response = RestTemplateHelper().addUrl(url).getForEntity(Array<Array<Any>>::class.java).body!!
        val first = response[1].last().toString().toFloat()
        val last = response.last().last().toString().toFloat()
        return this.getRate(first, last)
    }

    private fun getRate(first: Float, last: Float): Float {
        return ((last - first) * 100) / first
    }
}