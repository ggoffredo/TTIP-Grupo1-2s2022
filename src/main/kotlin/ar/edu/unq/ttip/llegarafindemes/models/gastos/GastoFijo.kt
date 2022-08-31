package ar.edu.unq.ttip.llegarafindemes.models.gastos

import ar.edu.unq.ttip.llegarafindemes.models.MedioDeGasto
import ar.edu.unq.ttip.llegarafindemes.models.Usuario
import javax.persistence.Entity

@Entity
class GastoFijo(
    id: Int = 0,
    descripcion: String,
    monto: Float,
    medioDeGasto: MedioDeGasto,
    usuario: Usuario
) : Gasto(id, descripcion, monto, medioDeGasto, usuario) {
}