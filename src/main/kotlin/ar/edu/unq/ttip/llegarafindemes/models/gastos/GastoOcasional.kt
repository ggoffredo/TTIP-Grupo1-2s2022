package ar.edu.unq.ttip.llegarafindemes.models.gastos

import ar.edu.unq.ttip.llegarafindemes.models.MedioDeGasto
import ar.edu.unq.ttip.llegarafindemes.models.Usuario
import java.time.LocalDate
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

@Entity
class GastoOcasional(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) override var id: Int = 0,
    descripcion: String,
    monto: Float,
    medioDeGasto: MedioDeGasto,
    fechaInicioDeCobro: LocalDate,
    usuario: Usuario
) : GastoEnCuotas(id, descripcion, monto, medioDeGasto, 1, fechaInicioDeCobro, usuario) {
}