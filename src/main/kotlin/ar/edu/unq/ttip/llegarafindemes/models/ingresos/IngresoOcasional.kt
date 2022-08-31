package ar.edu.unq.ttip.llegarafindemes.models.ingresos

import ar.edu.unq.ttip.llegarafindemes.models.Usuario
import java.time.LocalDate
import javax.persistence.*

@Entity
class IngresoOcasional(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) override var id: Int = 0,
    descripcion: String,
    monto: Int,
    @Column(nullable = false) var fechaIngreso: LocalDate,
    usuario: Usuario
) : Ingreso(id, descripcion, monto, usuario)