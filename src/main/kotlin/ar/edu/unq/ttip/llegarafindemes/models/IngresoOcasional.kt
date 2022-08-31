package ar.edu.unq.ttip.llegarafindemes.models

import java.time.LocalDate
import javax.persistence.Column
import javax.persistence.Entity

@Entity
class IngresoOcasional(
    id: Int = 0,
    descripcion: String,
    monto: Int,
    @Column(nullable = false) var fechaIngreso: LocalDate,
    usuario: Usuario
) : IngresoFijo(id, descripcion, monto, usuario){
}