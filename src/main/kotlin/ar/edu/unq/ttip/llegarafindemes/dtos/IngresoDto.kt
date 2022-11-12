package ar.edu.unq.ttip.llegarafindemes.dtos

import ar.edu.unq.ttip.llegarafindemes.models.Ingreso
import ar.edu.unq.ttip.llegarafindemes.models.Periodicidad
import ar.edu.unq.ttip.llegarafindemes.models.Usuario
import java.time.LocalDate

data class IngresoDto(val descripcion: String, val monto: Int, val periodicidad: Periodicidad, val duracion: Int, val fecha: LocalDate) {
    fun createIngreso(user: Usuario): Ingreso {
        return Ingreso(descripcion = descripcion, monto = monto, periodicidad = periodicidad, duracion = duracion, fecha = fecha, usuario = user)
    }
}