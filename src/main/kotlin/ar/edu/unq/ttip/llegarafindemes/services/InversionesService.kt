package ar.edu.unq.ttip.llegarafindemes.services

import ar.edu.unq.ttip.llegarafindemes.helpers.RestTemplateHelper
import ar.edu.unq.ttip.llegarafindemes.models.Inversion
import ar.edu.unq.ttip.llegarafindemes.models.Periodicidad
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

@Service
class InversionesService(
    private val bcraScrapperService: BcraScrapperService,
    private val bcraApiService: BcraApiService,
    private val ambitoService: AmbitoService
) {

    fun getInversiones(): HashMap<String, List<Inversion>> {
        return hashMapOf(
            "Plazos Fijos" to getPlazosFijosAsInversiones(),
            "Dolares" to getDolaresAsInversion()
        )
    }

    private fun getPlazosFijosAsInversiones(): List<Inversion> {
        val list = bcraScrapperService.getAllPFOptions().map {e -> e.toInversion()}.toMutableList()
        list.add(bcraApiService.getPlazoFijoUvaAsInversion())
        return list
    }

    private fun getDolaresAsInversion(): List<Inversion> {
        return listOf(
            bcraApiService.getDolarBlueAsInversion(),
            ambitoService.getDolarBolsaAsInversion(),
            ambitoService.getDolarAhorroAsInversion()
        )
    }
}
