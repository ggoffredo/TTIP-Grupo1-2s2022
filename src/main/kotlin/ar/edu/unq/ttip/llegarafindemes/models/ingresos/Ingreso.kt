package ar.edu.unq.ttip.llegarafindemes.models.ingresos

import ar.edu.unq.ttip.llegarafindemes.models.Usuario
import ar.edu.unq.ttip.llegarafindemes.models.gastos.GastoEnCuotas
import ar.edu.unq.ttip.llegarafindemes.models.gastos.GastoFijo
import ar.edu.unq.ttip.llegarafindemes.models.gastos.GastoOcasional
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
    JsonSubTypes.Type(value = IngresoFijo::class, name = "fijo"),
    JsonSubTypes.Type(value = IngresoOcasional::class, name = "ocasional")
)
abstract class Ingreso(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) open var id: Int = 0,
    @Column(nullable = false) var descripcion: String,
    @Column(nullable = false) var monto: Int,
    @JsonIgnore @ManyToOne(cascade = [CascadeType.ALL]) @JoinColumn(referencedColumnName = "id", nullable = false) var usuario: Usuario
)