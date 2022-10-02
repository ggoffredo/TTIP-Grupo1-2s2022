package ar.edu.unq.ttip.llegarafindemes.services

import ar.edu.unq.ttip.llegarafindemes.helpers.RestTemplateHelper
import ar.edu.unq.ttip.llegarafindemes.models.Ipc
import org.jsoup.Jsoup
import org.jsoup.select.Elements
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpRequest
import org.springframework.http.client.ClientHttpRequestExecution
import org.springframework.http.client.ClientHttpRequestInterceptor
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate
import org.springframework.web.util.UriComponentsBuilder

@Service
class IPCService {

    private val URL = "https://api.estadisticasbcra.com/inflacion_mensual_oficial"
    // TODO: Mover a otro lado
    private val token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTU5NTE4OTMsInR5cGUiOiJleHRlcm5hbCIsInVzZXIiOiJnYXN0b24uZ29mZnJlZG9AZ21haWwuY29tIn0.SSg8DqYMQbiXSYcVGdca7govAwuLyYsnZuGSUL0VP5dbckD9En7Hfn8O8npVqKpCXG5Twgb-j62y5P88tjSl4g"

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
        val response = restTemplateHelper.addUrl(URL).addBearer(token).getForEntity(Array<Any>::class.java)
        val ipcs = response.body!!.takeLast(6).reversed().map { e -> e as LinkedHashMap<String, Any>; Ipc(e["d"]!!.toString(), e["v"]!!.toString()) }
        return ipcs.toMutableList()
    }
}