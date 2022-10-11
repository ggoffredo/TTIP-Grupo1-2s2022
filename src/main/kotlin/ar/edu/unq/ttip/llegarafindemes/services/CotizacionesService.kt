package ar.edu.unq.ttip.llegarafindemes.services

import ar.edu.unq.ttip.llegarafindemes.helpers.RestTemplateHelper
import ar.edu.unq.ttip.llegarafindemes.models.Cotizacion
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.util.*

@Service
class CotizacionesService(private val restTemplateHelper: RestTemplateHelper) {

    @Value("\${dolarSi.api.url}")
    private val DOLAR_SI_API_URL = "dolarSiApiUrl"
    private val dolaresHabilitados = arrayOf("Dolar Blue", "Dolar Bolsa", "Dolar turista")

    fun getDolares(): List<Cotizacion> {
        val response = this.restTemplateHelper.addUrl(DOLAR_SI_API_URL).getForEntity(Array<Any>::class.java).body!!
        return response.map {
            it as LinkedHashMap<*,*>
            Cotizacion(
                (it["casa"] as LinkedHashMap<String,String>)!!["nombre"] ?: "",
                (it["casa"] as LinkedHashMap<String,String>)!!["compra"]?.replace(",",".") ?: "",
                (it["casa"] as LinkedHashMap<String,String>)!!["venta"]?.replace(",",".") ?: ""
            )
        }.filter {cotizacion -> cotizacion.nombre in (dolaresHabilitados)}
    }
}
