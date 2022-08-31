package ar.edu.unq.ttip.llegarafindemes.models

import javax.persistence.*

// Visa, Mastercard, Efectivo, etc.
// La idea es que cada usuario pueda crear los medios de gasto que necesite
@Entity
class MedioDeGasto(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) var id: Int,
    @Column(nullable = false) var nombre: String,
    @ManyToOne(cascade = [CascadeType.ALL]) @JoinColumn(referencedColumnName = "id", nullable = false) var usuario: Usuario
) {
}