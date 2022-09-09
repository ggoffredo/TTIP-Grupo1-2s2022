package ar.edu.unq.ttip.llegarafindemes.models

import javax.persistence.*

@Entity
data class PFijo(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) var id: Int = 0,
    @Column(nullable = false) val codigoEntidad: String,
    @Column(nullable = false) val descripcionEntidad: String,
    @Column(nullable = false) val fechaInformacion: String,
    @Column(nullable = false) val nombreCompleto: String,
    @Column(nullable = false) val nombreCorto: String,
    @Column(nullable = false) val denominacion: String,
    @Column(nullable = false) val montoMinimo: String,
    @Column(nullable = false) val plazoMinimo: String,
    @Column(nullable = false) val canal: String,
    @Column(nullable = false) val tasa: String,
    @Column(nullable = false) val territorioDeValidez: String,
    @Column(nullable = false, length = 1024) val masInformacion: String
)