package ar.edu.unq.ttip.llegarafindemes.integration

import ar.edu.unq.ttip.llegarafindemes.services.BCRAService
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired

class BCRATest {
    @Autowired
    private var bcraService: BCRAService = BCRAService()

    @Test
    fun getPlazoFijoCSVTest() {
        var file = bcraService.downloadPFCSVFile()
        assert(!file.isNullOrEmpty())
        bcraService.deletePFCSVFile()
    }
}