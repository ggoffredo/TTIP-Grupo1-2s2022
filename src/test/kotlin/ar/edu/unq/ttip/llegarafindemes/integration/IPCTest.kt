package ar.edu.unq.ttip.llegarafindemes.integration

import ar.edu.unq.ttip.llegarafindemes.services.IPCService
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class IPCTest {
    @Autowired
    private var ipcService: IPCService = IPCService()

    @Test
    fun enBaseALaPaginaDelINDECSeObtieneElIPCDelUltimoMes(){
        val ipc = ipcService.getLastMonthIPC()
        assert(ipc.value.isNotEmpty())
        assert(ipc.month.isNotEmpty())
    }

}