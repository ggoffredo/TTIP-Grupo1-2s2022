package ar.edu.unq.ttip.llegarafindemes.services

import ar.edu.unq.ttip.llegarafindemes.models.PFijo
import ar.edu.unq.ttip.llegarafindemes.repositories.PFijoRepository
import org.apache.commons.csv.CSVFormat
import org.apache.commons.csv.CSVParser
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.io.File
import java.io.FileOutputStream
import java.net.URL
import java.nio.channels.Channels
import java.nio.file.Files
import kotlin.io.path.Path

@Service
class BCRAService(@Autowired private var pfijoRepository: PFijoRepository) {
    private val pfcsvName = "PFIJO.CSV"
    private val pfcsvPath = "http://www.bcra.gov.ar/pdfs/BCRAyVos/$pfcsvName"

    fun downloadPFCSVFile() {
        val url = URL(pfcsvPath)
        url.openStream().use {
            Channels.newChannel(it).use { rbc ->
                FileOutputStream(pfcsvName).use { fos ->
                    fos.channel.transferFrom(rbc, 0, Long.MAX_VALUE)
                }
            }
        }
    }

    fun deletePFCSVFile(){
        Files.deleteIfExists(Path(pfcsvName))
    }

    fun processCSV(path: String = pfcsvName) {
        val bufferedReader = File(path).bufferedReader()
        val csvParser = CSVParser(bufferedReader, CSVFormat.DEFAULT.withDelimiter(';').withHeader())

        pfijoRepository.deleteAll()

        for (csvRecord in csvParser) {
            val pfijo = PFijo(
                codigoEntidad = csvRecord.get(0),
                descripcionEntidad = csvRecord.get(1),
                fechaInformacion = csvRecord.get(2),
                nombreCompleto = csvRecord.get(3),
                nombreCorto = csvRecord.get(4),
                denominacion = csvRecord.get(5),
                montoMinimo = csvRecord.get(6),
                plazoMinimo = csvRecord.get(7),
                canal = csvRecord.get(8),
                tasa = csvRecord.get(9),
                territorioDeValidez = csvRecord.get(10),
                masInformacion = csvRecord.get(11)
            )
            pfijoRepository.save(pfijo)
        }

        bufferedReader.close()
    }

    fun getAllPFOptions(): MutableList<PFijo> {
        return pfijoRepository.findAll()
    }
}