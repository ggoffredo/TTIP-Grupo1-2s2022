package ar.edu.unq.ttip.llegarafindemes.helpers

import java.time.LocalDate
import java.time.temporal.ChronoUnit
import java.util.stream.Collectors
import java.util.stream.Stream

class DateHelper {
    companion object {
        fun getMonthsAsArray(from: LocalDate, to: LocalDate): MutableList<LocalDate> {
            return Stream
                .iterate(
                    from
                ) { date: LocalDate -> date.plusMonths(1) }
                .limit(ChronoUnit.MONTHS.between(from, to))
                .collect(Collectors.toList())
        }
    }
}