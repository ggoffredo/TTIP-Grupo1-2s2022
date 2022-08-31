package ar.edu.unq.ttip.llegarafindemes.models.gastos

import ar.edu.unq.ttip.llegarafindemes.models.MedioDeGasto
import ar.edu.unq.ttip.llegarafindemes.models.Usuario
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

@Entity
class GastoFijo(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) override var id: Int = 0,
    descripcion: String,
    monto: Float,
    medioDeGasto: MedioDeGasto,
    usuario: Usuario
) : Gasto(id, descripcion, monto, medioDeGasto, usuario)