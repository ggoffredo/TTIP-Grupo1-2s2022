package ar.edu.unq.ttip.llegarafindemes.services

import ar.edu.unq.ttip.llegarafindemes.helpers.RestTemplateHelper
import ar.edu.unq.ttip.llegarafindemes.models.Ipc
import org.jsoup.Jsoup
import org.jsoup.select.Elements
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

@Service
class IPCService {

    @Value("\${bcra.api.base-url}")
    private val BASE_URL = "bcraBaseUrl"
    @Value("\${bcra.api.inflacion-mensual}")
    private val INFLACION_MENSUAL_PATH = "/inflacion_mensual_oficial"
    @Value("\${bcra.api.token}")
    private var token = "someToken"

    fun getLastMonthIPC(): Ipc {
        val document = Jsoup.parse(Jsoup
            .connect("https://www.indec.gob.ar/Nivel3/Tema/3/5")
            .userAgent("Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36")
            .get().html())
        val elements = document.select("div.indicadores-inicio").select("div.col-md-3:contains(Precios al consumidor)").select("div")
        return toIPC(elements)
    }

    private fun toIPC(elements: Elements): Ipc {
        return Ipc(value = elements[2].toString().substringAfter("\n").substringBefore("%\n"), month = elements[4].toString().substringAfter("\n").substringBefore("\n"))
    }

    fun getIPCByMonth(): MutableList<Ipc> {
        val restTemplateHelper = RestTemplateHelper()
        val response = restTemplateHelper.addUrl("$BASE_URL$INFLACION_MENSUAL_PATH").addBearer(token).getForEntity(Array<Any>::class.java)
        val ipcs = response.body!!.takeLast(6).reversed().map { e -> e as LinkedHashMap<String, Any>; Ipc(e["d"]!!.toString(), e["v"]!!.toString()) }
        return ipcs.toMutableList()
    }
}