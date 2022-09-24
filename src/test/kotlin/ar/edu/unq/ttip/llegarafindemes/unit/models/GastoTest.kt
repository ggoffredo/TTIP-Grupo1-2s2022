package ar.edu.unq.ttip.llegarafindemes.unit.models

import ar.edu.unq.ttip.llegarafindemes.models.Gasto
import ar.edu.unq.ttip.llegarafindemes.models.MedioDePago
import ar.edu.unq.ttip.llegarafindemes.models.Periodicidad
import ar.edu.unq.ttip.llegarafindemes.models.Usuario
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import java.time.LocalDate

class GastoTest {

    @Test
    fun unGastoFijoDeHaceDosMesesCorrespondeEstarEnElMesActual(){
        val gastoFijo = buildGasto(Periodicidad.MENSUAL, 0, LocalDate.now().minusMonths(2))
        assertTrue(gastoFijo.correspondsToMonth(LocalDate.now()))
    }

    @Test
    fun unGastoFijoDelMesActualCorrespondeEstarEnElMesActual(){
        val gastoFijo = buildGasto(Periodicidad.MENSUAL, 0, LocalDate.now())
        assertTrue(gastoFijo.correspondsToMonth(LocalDate.now()))
    }

    @Test
    fun unGastoFijoDePosteriorAHoyNoCorrespondeEstarEnElMesActual(){
        val gastoFijo = buildGasto(Periodicidad.MENSUAL, 0, LocalDate.now().plusMonths(2))
        assertFalse(gastoFijo.correspondsToMonth(LocalDate.now()))
    }

    @Test
    fun unGastoOcasionalDeUnPeriodoMensualDeHaceDosMesesNoCorrespondeEstarEnElMesActual(){
        val gastoOcasional = buildGasto(Periodicidad.MENSUAL, 1, LocalDate.now().minusMonths(2))
        assertFalse(gastoOcasional.correspondsToMonth(LocalDate.now()))
    }

    @Test
    fun unGastoOcasionalDeDosPeriodoMensualesDeHaceDosMesesNoCorrespondeEstarEnElMesActual(){
        val gastoOcasional = buildGasto(Periodicidad.MENSUAL, 2, LocalDate.now().minusMonths(2))
        assertFalse(gastoOcasional.correspondsToMonth(LocalDate.now().withDayOfMonth(1)))
    }

    @Test
    fun unGastoOcasionalDeTresPeriodoMensualesDeHaceDosMesesCorrespondeEstarEnElMesActual(){
        val gastoOcasional = buildGasto(Periodicidad.MENSUAL, 3, LocalDate.now().minusMonths(2).withDayOfMonth(1))
        assertTrue(gastoOcasional.correspondsToMonth(LocalDate.now().withDayOfMonth(1)))
    }

    @Test
    fun unGastoOcasionalDeUnPeriodoMensualPosteriorAlMesActualNoCorrespondeEstarEnElMesActual(){
        val gastoOcasional = buildGasto(Periodicidad.MENSUAL, 1, LocalDate.now().plusMonths(1))
        assertFalse(gastoOcasional.correspondsToMonth(LocalDate.now().withDayOfMonth(1)))
    }

    @Test
    fun unGastoOcasionalDeDocePeriodosMensualsPosteriorAlMesActualCorrespondeEstarEnElMesActual(){
        val gastoOcasional = buildGasto(Periodicidad.MENSUAL, 12, LocalDate.now().minusMonths(1).withDayOfMonth(1))
        assertTrue(gastoOcasional.correspondsToMonth(LocalDate.now().withDayOfMonth(1)))
    }

    private fun buildGasto(periodicidad: Periodicidad, duracion: Int, fecha: LocalDate): Gasto {
        val medioDePago = MedioDePago(1, "Visa")
        val usuario = Usuario(1, "Pepe", "Rodriguez", "peperodriguez@gmail.com", "UnaPassword")
        return Gasto(1, "Pava", 1000, periodicidad, duracion, fecha, medioDePago, usuario)
    }
}