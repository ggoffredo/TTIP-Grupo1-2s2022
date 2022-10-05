package ar.edu.unq.ttip.llegarafindemes.services

import ar.edu.unq.ttip.llegarafindemes.helpers.RestTemplateHelper
import ar.edu.unq.ttip.llegarafindemes.models.Ipc
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
        return doGetIPCs(1).last()
    }

    fun getIPCByMonth(): List<Ipc> {
        return doGetIPCs(6)
    }

    private fun doGetIPCs(n: Int): List<Ipc> {
        val restTemplateHelper = RestTemplateHelper()
        val response = restTemplateHelper.addUrl("$BASE_URL$INFLACION_MENSUAL_PATH").addBearer(token).getForEntity(Array<Any>::class.java)
        return response.body!!.takeLast(n).reversed().map { e -> e as LinkedHashMap<*, *>; Ipc(e["d"]!!.toString(), e["v"]!!.toString()) }
    }
}