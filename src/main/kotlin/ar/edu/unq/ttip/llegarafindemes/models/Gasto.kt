package ar.edu.unq.ttip.llegarafindemes.models

import com.fasterxml.jackson.annotation.JsonIgnore
import java.time.LocalDate
import javax.persistence.*

@Entity
class Gasto(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) var id: Int = 0,
    @Column (nullable = false) var descripcion: String,
    @Column (nullable = false) var monto: Float,
    @Column (nullable = false) var periodicidad: Periodicidad,
    @Column (nullable = false) var duracion: Int,
    @Column (nullable = false) var fecha: LocalDate,
    @OneToOne(cascade = [CascadeType.ALL]) @JoinColumn(referencedColumnName = "id", nullable = false) var medioDePago: MedioDePago,
    @JsonIgnore @ManyToOne(cascade = [CascadeType.ALL]) @JoinColumn(referencedColumnName = "id", nullable = false) var usuario: Usuario
)