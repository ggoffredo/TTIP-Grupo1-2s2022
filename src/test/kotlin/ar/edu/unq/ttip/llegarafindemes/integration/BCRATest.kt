package ar.edu.unq.ttip.llegarafindemes.integration

import ar.edu.unq.ttip.llegarafindemes.services.BCRAService
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import kotlin.io.path.Path

@SpringBootTest
class BCRATest {
    @Autowired
    private var bcraService: BCRAService = BCRAService()

    @Test
    fun enBaseAUnCSVSeCreanLosRegistrosCorrespondientes(){
        bcraService.processCSV("./src/test/kotlin/ar/edu/unq/ttip/llegarafindemes/resources/PFIJO.CSV")
        var pfs = bcraService.getAllPFOptions()
        pfs.forEach { pf -> println(pf) }
        assert(pfs.isNotEmpty())
    }

    @Test
    fun alProcesarMasDeUnCSVSolamenteSemantieneLaUltimaInformacion(){
        bcraService.processCSV("./src/test/kotlin/ar/edu/unq/ttip/llegarafindemes/resources/PFIJO.CSV")
        var pfs = bcraService.getAllPFOptions()

        assert(pfs.size == 998)

        bcraService.processCSV("./src/test/kotlin/ar/edu/unq/ttip/llegarafindemes/resources/PFIJO-2.CSV")
        pfs = bcraService.getAllPFOptions()

        assert(pfs.size == 2)
    }
}