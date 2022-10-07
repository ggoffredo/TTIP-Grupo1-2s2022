package ar.edu.unq.ttip.llegarafindemes.integration

import ar.edu.unq.ttip.llegarafindemes.services.BcraApiService
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class IPCTest {
    @Autowired
    private var bcraApiService: BcraApiService = BcraApiService()

    @Test
    fun enBaseALaPaginaDelINDECSeObtieneElIPCDelUltimoMes(){
        val ipc = bcraApiService.getLastMonthIPC()
        assert(ipc.value.isNotEmpty())
        assert(ipc.month.isNotEmpty())
    }

    @Test
    fun enBaseALaApiDeEstadisticaBCRASeObtieneElIPCDelLosUltimosMeses(){
        val ipcs = bcraApiService.getIPCByMonth()
        assert(ipcs.isNotEmpty())
    }

}