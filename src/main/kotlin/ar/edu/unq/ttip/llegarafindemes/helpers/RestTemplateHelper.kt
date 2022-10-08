package ar.edu.unq.ttip.llegarafindemes.helpers

import org.springframework.http.HttpHeaders
import org.springframework.http.HttpRequest
import org.springframework.http.ResponseEntity
import org.springframework.http.client.ClientHttpRequestExecution
import org.springframework.http.client.ClientHttpRequestInterceptor
import org.springframework.stereotype.Component
import org.springframework.web.client.RestTemplate
import org.springframework.web.util.UriComponentsBuilder

@Component
class RestTemplateHelper(private val restTemplate: RestTemplate = RestTemplate()) {
    private lateinit var url: String

    fun addUrl(url: String): RestTemplateHelper {
        this.url = UriComponentsBuilder.fromHttpUrl(url).encode().toUriString()
        return this
    }

    fun addBearer(token: String): RestTemplateHelper {
        this.restTemplate.interceptors.add(ClientHttpRequestInterceptor { outReq: HttpRequest, bytes: ByteArray?, clientHttpReqExec: ClientHttpRequestExecution ->
            outReq.headers[HttpHeaders.AUTHORIZATION] = "BEARER $token"
            clientHttpReqExec.execute(outReq, bytes!!)
        })
        return this
    }

    fun <T> getForEntity(entity: Class<T>): ResponseEntity<T> {
        return this.restTemplate.getForEntity(this.url, entity)
    }
}