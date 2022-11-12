package ar.edu.unq.ttip.llegarafindemes.services

import ar.edu.unq.ttip.llegarafindemes.exceptions.MedioDePagoNotFoundException
import ar.edu.unq.ttip.llegarafindemes.models.MedioDePago
import ar.edu.unq.ttip.llegarafindemes.repositories.MedioDePagoRepository
import org.springframework.stereotype.Service

@Service
class MedioDePagoService(private val medioDePagoRepository: MedioDePagoRepository) {

    @Throws(MedioDePagoNotFoundException::class)
    fun getMedioDePago(medioDePagoId: Int): MedioDePago {
        return medioDePagoRepository.findById(medioDePagoId).orElseThrow{ MedioDePagoNotFoundException() }
    }
}