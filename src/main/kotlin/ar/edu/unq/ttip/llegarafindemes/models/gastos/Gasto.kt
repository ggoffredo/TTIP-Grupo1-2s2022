package ar.edu.unq.ttip.llegarafindemes.models.gastos

import ar.edu.unq.ttip.llegarafindemes.models.MedioDeGasto
import ar.edu.unq.ttip.llegarafindemes.models.Usuario
import javax.persistence.*

@Inheritance(strategy = InheritanceType.JOINED)
@MappedSuperclass
abstract class Gasto(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) open var id: Int = 0,
    @Column (nullable = false) var descripcion: String,
    @Column (nullable = false) var monto: Float,
    @OneToOne(cascade = [CascadeType.ALL]) @JoinColumn(referencedColumnName = "id", nullable = false) var medioDeGasto: MedioDeGasto,
    @ManyToOne(cascade = [CascadeType.ALL]) @JoinColumn(referencedColumnName = "id", nullable = false) var usuario: Usuario
) {
}