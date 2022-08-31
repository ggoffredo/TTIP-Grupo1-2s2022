package ar.edu.unq.ttip.llegarafindemes.models

import javax.persistence.*

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
open class IngresoFijo(
    @Id @GeneratedValue(strategy = GenerationType.TABLE) var id: Int = 0,
    @Column(nullable = false) var descripcion: String,
    @Column(nullable = false) var monto: Int,
    @ManyToOne(cascade = [CascadeType.ALL]) @JoinColumn(referencedColumnName = "id", nullable = false) var usuario: Usuario
) {
}