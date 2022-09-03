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
    fun descargaDelArchivoCSVdePlazosFijosDelBCRA() {
        var file = bcraService.downloadPFCSVFile()
        assert(!file.isNullOrEmpty())
        bcraService.deletePFCSVFile()
    }

    @Test
    fun enBaseAUnCSVSeCreanLosRegistrosCorrespondientes(){
        bcraService.processCSV(Path("./src/test/kotlin/ar/edu/unq/ttip/llegarafindemes/resources/PFIJO.CSV"))
        var PFs = bcraService.getAllPFOptions()
        PFs.forEach { pf -> println(pf) }
        assert(PFs.isNotEmpty())
    }

    @Test
    fun alProcesarMasDeUnCSVSolamenteSemantieneLaUltimaInformacion(){
        assert(false)
    }
}