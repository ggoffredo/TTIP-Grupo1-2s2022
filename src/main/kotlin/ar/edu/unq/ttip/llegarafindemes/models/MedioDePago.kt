package ar.edu.unq.ttip.llegarafindemes.models

import javax.persistence.*

@Entity
class MedioDePago(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) var id: Int,
    @Column(nullable = false) var nombre: String
)