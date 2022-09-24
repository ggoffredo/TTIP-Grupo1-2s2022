package ar.edu.unq.ttip.llegarafindemes.services

import ar.edu.unq.ttip.llegarafindemes.models.Ipc
import org.jsoup.Jsoup
import org.jsoup.select.Elements
import org.springframework.stereotype.Service

@Service
class IPCService {

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
}