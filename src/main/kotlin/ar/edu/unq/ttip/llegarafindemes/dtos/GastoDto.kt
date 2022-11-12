package ar.edu.unq.ttip.llegarafindemes.dtos

import ar.edu.unq.ttip.llegarafindemes.models.*
import java.time.LocalDate

data class GastoDto(val descripcion: String, val monto: Int, val periodicidad: Periodicidad, val duracion: Int, val fecha: LocalDate) {
    fun createGasto(user: Usuario, medioDePago: MedioDePago): Gasto {
        return Gasto(
            descripcion = descripcion,
            monto = monto,
            periodicidad = periodicidad,
            duracion = duracion,
            fecha = fecha,
            usuario = user,
            medioDePago = medioDePago
        )
    }
}