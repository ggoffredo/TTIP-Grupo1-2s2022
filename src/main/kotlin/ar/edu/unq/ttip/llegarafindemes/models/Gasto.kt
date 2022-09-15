package ar.edu.unq.ttip.llegarafindemes.models

import java.time.LocalDate
import javax.persistence.*

@Entity
class Gasto(
    id: Int = 0,
    descripcion: String,
    monto: Int,
    periodicidad: Periodicidad,
    duracion: Int,
    fecha: LocalDate,
    @OneToOne(cascade = [CascadeType.ALL]) @JoinColumn(referencedColumnName = "id", nullable = false) var medioDePago: MedioDePago,
    usuario: Usuario
) : Administrable(id, descripcion, monto, periodicidad, duracion, fecha, usuario)