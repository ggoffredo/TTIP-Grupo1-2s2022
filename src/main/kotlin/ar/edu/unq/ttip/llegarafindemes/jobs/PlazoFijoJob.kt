package ar.edu.unq.ttip.llegarafindemes.jobs

import ar.edu.unq.ttip.llegarafindemes.services.BcraScrapperService
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.scheduling.annotation.EnableScheduling
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component

@Component
@EnableScheduling
class PlazoFijoJob(private val BcraScrapperService: BcraScrapperService) {
    @Value("\${bcra.enable-job}")
    private var runBcraJob: Boolean = false
    private val logger = LoggerFactory.getLogger(PlazoFijoJob::class.java)

    @Scheduled(cron = "@daily")
    fun run() {
        if (!this.runBcraJob){
            logger.info("Plazos fijos job skipped")
            return
        }
        logger.info("Updating Plazos fijos")
        logger.info("Downloading CSV")
        BcraScrapperService.downloadPFCSVFile()
        logger.info("Processing CSV")
        BcraScrapperService.processCSV()
        logger.info("Deleting CSV")
        BcraScrapperService.deletePFCSVFile()
        logger.info("Update Plazos fijos finished")
    }
}