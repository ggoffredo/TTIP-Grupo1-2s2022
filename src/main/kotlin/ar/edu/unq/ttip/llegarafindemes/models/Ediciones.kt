package ar.edu.unq.ttip.llegarafindemes.models

import java.time.LocalDate

class Ediciones(val ediciones: HashMap<LocalDate, Int>) {
    fun getValueFromDate(date: LocalDate): Int {
        return this.ediciones[date.withDayOfMonth(1)] ?: 0
    }
}