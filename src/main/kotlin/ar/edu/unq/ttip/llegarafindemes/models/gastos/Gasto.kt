package ar.edu.unq.ttip.llegarafindemes.models.gastos

import ar.edu.unq.ttip.llegarafindemes.models.MedioDeGasto
import ar.edu.unq.ttip.llegarafindemes.models.Usuario
import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonSubTypes
import com.fasterxml.jackson.annotation.JsonTypeInfo
import javax.persistence.*

@Inheritance(strategy = InheritanceType.JOINED)
@MappedSuperclass
@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME,
    include = JsonTypeInfo.As.PROPERTY,
    property = "type"
)
@JsonSubTypes(
    JsonSubTypes.Type(value = GastoFijo::class, name = "fijo"),
    JsonSubTypes.Type(value = GastoOcasional::class, name = "ocasional"),
    JsonSubTypes.Type(value = GastoEnCuotas::class, name = "cuotas")
)
abstract class Gasto(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) open var id: Int = 0,
    @Column (nullable = false) var descripcion: String,
    @Column (nullable = false) var monto: Float,
    @OneToOne(cascade = [CascadeType.ALL]) @JoinColumn(referencedColumnName = "id", nullable = false) var medioDeGasto: MedioDeGasto,
    @JsonIgnore @ManyToOne(cascade = [CascadeType.ALL]) @JoinColumn(referencedColumnName = "id", nullable = false) var usuario: Usuario
)