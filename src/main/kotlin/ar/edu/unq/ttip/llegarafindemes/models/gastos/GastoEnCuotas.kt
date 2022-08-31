package ar.edu.unq.ttip.llegarafindemes.models.gastos

import ar.edu.unq.ttip.llegarafindemes.models.MedioDeGasto
import ar.edu.unq.ttip.llegarafindemes.models.Usuario
import java.time.LocalDate
import javax.persistence.*

@Inheritance(strategy = InheritanceType.JOINED)
@MappedSuperclass
open class GastoEnCuotas(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) override var id: Int = 0,
    descripcion: String,
    monto: Float,
    medioDeGasto: MedioDeGasto,
    @Column(nullable = false) var cantidadDeCuotas: Int,
    @Column (nullable = false) var fechaInicioDeCobro: LocalDate,
    usuario: Usuario
) : Gasto(id, descripcion, monto, medioDeGasto, usuario)