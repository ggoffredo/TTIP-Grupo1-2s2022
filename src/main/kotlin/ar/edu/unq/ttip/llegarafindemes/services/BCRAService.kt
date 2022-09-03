package ar.edu.unq.ttip.llegarafindemes.services

import org.springframework.stereotype.Service
import java.io.FileOutputStream
import java.net.URL
import java.nio.channels.Channels
import java.nio.file.Files
import kotlin.io.path.Path

@Service
class BCRAService {
    private val pfcsvName = "PFIJO.CSV"
    private val pfcsvPath = "http://www.bcra.gov.ar/pdfs/BCRAyVos/$pfcsvName"

    fun downloadPFCSVFile(): String? {
        var url = URL(pfcsvPath)
        url.openStream().use {
            Channels.newChannel(it).use { rbc ->
                FileOutputStream(pfcsvName).use { fos ->
                    fos.channel.transferFrom(rbc, 0, Long.MAX_VALUE)
                }
            }
        }
        return url.file
    }

    fun deletePFCSVFile(){
        Files.delete(Path(pfcsvName))
    }
}