package ar.edu.unq.ttip.llegarafindemes.models.ingresos

import ar.edu.unq.ttip.llegarafindemes.models.Usuario
import javax.persistence.*

@Entity
open class IngresoFijo(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) override var id: Int = 0,
    descripcion: String,
    monto: Int,
    usuario: Usuario
) : Ingreso(id, descripcion, monto, usuario)