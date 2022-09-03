package ar.edu.unq.ttip.llegarafindemes.integration

import ar.edu.unq.ttip.llegarafindemes.services.BCRAService
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import kotlin.io.path.Path

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
    fun enBaseAlCSVSeCreanLosRegistrosCorrespondientes(){
        bcraService.processCSV(Path("./src/test/kotlin/ar/edu/unq/ttip/llegarafindemes/resources/PFIJO.CSV"))
        var PFs = bcraService.getAllPFOptions()
        assert(PFs.isNotEmpty())
    }
}