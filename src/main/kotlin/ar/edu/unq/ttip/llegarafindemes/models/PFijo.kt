package ar.edu.unq.ttip.llegarafindemes.models

import java.util.*

data class PFijo(
    val codigoEntidad: String,
    val descripcionEntidad: String,
    val fechaInformación: String,
    val nombreCompleto: String,
    val nombreCorto: String,
    val denominacion: String,
    val montoMinimo: String,
    val plazoMinimo: String,
    val canal: String,
    val tasa: String,
    val territorioDeValidez: String,
    val masInformacion: String
)
