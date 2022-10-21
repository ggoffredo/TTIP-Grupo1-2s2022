package ar.edu.unq.ttip.llegarafindemes.services

import ar.edu.unq.ttip.llegarafindemes.helpers.RestTemplateHelper
import ar.edu.unq.ttip.llegarafindemes.models.Inversion
import ar.edu.unq.ttip.llegarafindemes.models.Ipc
import ar.edu.unq.ttip.llegarafindemes.models.Periodicidad
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

@Service
class BcraApiService(private val restTemplateHelper: RestTemplateHelper) {

    @Value("\${bcra.api.base-url}")
    private val BASE_URL = "bcraBaseUrl"
    @Value("\${bcra.api.inflacion-mensual}")
    private val INFLACION_MENSUAL_PATH = "inflacion_mensual_oficial"
    @Value("\${bcra.api.inflacion-esperada}")
    private val INFLACION_ESPERADA_PATH = "inflacion_mensual_oficial"
    @Value("\${bcra.api.token}")
    private var token = "someToken"

    fun getLastMonthIPC(): Ipc {
        return doGetIPCs(1).last()
    }

    fun getIPCByMonth(): List<Ipc> {
        return doGetIPCs(6)
    }

    fun getPlazoFijoUvaAsInversion(): Inversion {
        val response = this.getFromBcra("uva")
        val rate = this.getRateFromFirstAndLast(response)
        return Inversion("Plazo Fijo Uva", rate, Periodicidad.MENSUAL, 1, "PlazoFijo")
    }

    fun getDolarBlueAsInversion(): Inversion {
        // Ultimos 20 porque el valor es por dia habil
        val response = this.getFromBcra("usd", 20)
        val rate = this.getRateFromFirstAndLast(response)
        return Inversion("Dolar Blue", rate, Periodicidad.MENSUAL, 1, "Dolar")
    }

    private fun doGetIPCs(n: Int): List<Ipc> {
        return this.getFromBcra(INFLACION_MENSUAL_PATH, n).map { Ipc(it["d"]!!.toString(), it["v"]!!.toString()) }
    }

    private fun getFromBcra(resource: String, takeLast: Int = 30): List<LinkedHashMap<*,*>> {
        return this.restTemplateHelper
            .addUrl("$BASE_URL$resource")
            .addBearer(token)
            .getForEntity(Array<Any>::class.java)
            .body!!
            .takeLast(takeLast).map { e -> e as LinkedHashMap<*,*> }
    }

    private fun getRateFromFirstAndLast(data: List<LinkedHashMap<*,*>>): Float {
        val first = data.first()["v"].toString().toFloat()
        val last = data.last()["v"].toString().toFloat()
        return getRate(first, last)
    }

    private fun getRate(first: Float, last: Float): Float {
        return ((last - first) * 100) / first
    }

    fun getInflacionEsperadabyMonth(): Ipc {
        return this.getFromBcra(INFLACION_ESPERADA_PATH, 1).map { Ipc(it["d"]!!.toString(), it["v"]!!.toString()) }.first()
    }
}