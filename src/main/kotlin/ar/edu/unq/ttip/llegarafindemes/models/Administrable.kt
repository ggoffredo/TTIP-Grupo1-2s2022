package ar.edu.unq.ttip.llegarafindemes.models

import com.fasterxml.jackson.annotation.JsonIgnore
import java.time.LocalDate
import javax.persistence.*

@MappedSuperclass
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
open class Administrable(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) var id: Int = 0,
    @Column(nullable = false) var descripcion: String,
    @Column(nullable = false) var monto: Int,
    @Column(nullable = false) var periodicidad: Periodicidad,
    @Column(nullable = false) var duracion: Int,
    @Column(nullable = false) var fecha: LocalDate,
    @JsonIgnore @ManyToOne(cascade = [CascadeType.ALL]) @JoinColumn(referencedColumnName = "id", nullable = false) var usuario: Usuario
) {
    fun correspondsToMonth(referenceDate: LocalDate): Boolean {
        val initialReferenceDate = referenceDate.withDayOfMonth(1)
        val initialExpenseDate = fecha.withDayOfMonth(1)
        // Gasto posterior a fecha de referencia
        if (initialExpenseDate > initialReferenceDate) return false
        // Validación de gasto fijo
        if (duracion == 0) return initialExpenseDate <= initialReferenceDate
        // Validación de gastos ocasionales
        val lastIncomeMonth = initialExpenseDate.plusMonths(duracion.toLong())
        return lastIncomeMonth > initialReferenceDate
    }
}