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

    @Scheduled(cron = "0 0 * * * ?")
    fun run() {
        val logger = LoggerFactory.getLogger(PlazoFijoJob::class.java)
        logger.info("Updating Plazos fijo")
        logger.info("Downloading CSV")
        bcraService.downloadPFCSVFile()
        logger.info("Processing CSV")
        bcraService.processCSV()
        logger.info("Deleting CSV")
        bcraService.deletePFCSVFile()
        logger.info("Update Plazos fijo finished")
    }
}