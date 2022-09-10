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
) {
    fun correspondsToMonth(month: LocalDate): Boolean {
        val monthAtDayOne = month.withDayOfMonth(1)
        val expenseDayAtDayOne = fecha.withDayOfMonth(1)
        if (duracion == 0) return expenseDayAtDayOne.isBefore(monthAtDayOne) || expenseDayAtDayOne.isEqual(monthAtDayOne)
        val isAfterMonth = expenseDayAtDayOne.isAfter(monthAtDayOne)
        val lastExpenseMonth = expenseDayAtDayOne.plusMonths(duracion.toLong())
        return !isAfterMonth && lastExpenseMonth.isAfter(monthAtDayOne) || lastExpenseMonth.isEqual(monthAtDayOne)
    }
}