package ar.edu.unq.ttip.llegarafindemes.models

import java.time.LocalDate
import javax.persistence.*

@Entity
class Ingreso(
    id: Int = 0,
    descripcion: String,
    monto: Int,
    periodicidad: Periodicidad,
    duracion: Int,
    fecha: LocalDate,
    usuario: Usuario
) : Administrable(id, descripcion, monto, periodicidad, duracion, fecha, usuario)