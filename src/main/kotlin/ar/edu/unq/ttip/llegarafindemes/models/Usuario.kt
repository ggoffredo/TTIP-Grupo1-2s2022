package ar.edu.unq.ttip.llegarafindemes.models

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence.*

@Entity
class Usuario(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) var id: Int = 0,
    @Column(nullable = false) var nombre: String,
    @Column(nullable = false) var apellido: String,
    @Column(nullable = false, unique = true) var email: String,
    @JsonIgnore @Column(nullable = false) var password: String,
)