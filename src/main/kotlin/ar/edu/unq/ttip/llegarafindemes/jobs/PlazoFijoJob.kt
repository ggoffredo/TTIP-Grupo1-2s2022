package ar.edu.unq.ttip.llegarafindemes.jobs

import ar.edu.unq.ttip.llegarafindemes.services.BCRAService
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.scheduling.annotation.EnableScheduling
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component

@Component
@EnableScheduling
class PlazoFijoJob {
    @Autowired
    private lateinit var bcraService: BCRAService

    //TODO: Modificar periodicidad para que corra una vez al dia tras ser ejecutada la aplicacion
    @Scheduled(cron = "0 0/2 * * * ?")
    fun run() {
        LoggerFactory.getLogger(PlazoFijoJob::class.java).info("Updating Plazos fijo")
        println("Updating Plazos fijo")
        println("Downloading CSV")
        bcraService.downloadPFCSVFile()
        println("Processing PF")
        bcraService.processCSV()
        println("Deleting CSV")
        bcraService.deletePFCSVFile()
        println("Update Plazos fijo finished")
        LoggerFactory.getLogger(PlazoFijoJob::class.java).info("Update Plazos fijo finished")
    }
}