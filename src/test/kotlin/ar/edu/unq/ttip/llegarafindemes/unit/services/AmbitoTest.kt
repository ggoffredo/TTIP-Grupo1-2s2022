package ar.edu.unq.ttip.llegarafindemes.unit.services

import ar.edu.unq.ttip.llegarafindemes.helpers.RestTemplateHelper
import ar.edu.unq.ttip.llegarafindemes.models.Periodicidad
import ar.edu.unq.ttip.llegarafindemes.services.AmbitoService
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.*
import org.mockito.Mockito.*
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity

class AmbitoTest {

    @Mock(answer = Answers.RETURNS_SELF)
    lateinit var restTemplateHelper: RestTemplateHelper

    @InjectMocks
    lateinit var subject: AmbitoService

    @BeforeEach
    fun setUp() {
        MockitoAnnotations.openMocks(this)
    }

    @Test
    fun dadoUnaListaDeDolaresCuandoSePideLaInversionEnDolarBolsaSeRetornaLaInversionConLaTasaDeVariacionCalculada() {
        val response = ResponseEntity(
            arrayOf(
                arrayOf("fecha", "DOLAR MEP"),
                arrayOf("08-09-2022", "273.02"),
                arrayOf("09-09-2022", "269.56")
            ),
            HttpStatus.OK
        )
        `when`(restTemplateHelper.addUrl(anyString()).getForEntity(Array<Array<String>>::class.java)).thenReturn(response)
        val inversion = this.subject.getDolarBolsaAsInversion()
        assertEquals("Dolar Bolsa", inversion.nombre)
        assertEquals("Dolar", inversion.tipoDeInversion)
        assertEquals(Periodicidad.MENSUAL, inversion.periodo)
        assertEquals(1, inversion.cantidadDePeriodos)
        assertEquals(-1.2673033f, inversion.tasaDeVariacion)
    }

    @Test
    fun dadoUnaListaDeDolaresCuandoSePideLaInversionEnDolarAhorroSeRetornaLaInversionConLaTasaDeVariacionCalculada() {
        val response = ResponseEntity(
            arrayOf(
                arrayOf("fecha", "DOLAR AHORRO"),
                arrayOf("08-09-2022", "273.02"),
                arrayOf("09-09-2022", "274.96")
            ),
            HttpStatus.OK
        )
        `when`(restTemplateHelper.addUrl(anyString()).getForEntity(Array<Array<String>>::class.java)).thenReturn(response)
        val inversion = this.subject.getDolarAhorroAsInversion()
        assertEquals("Dolar Turista", inversion.nombre)
        assertEquals("Dolar", inversion.tipoDeInversion)
        assertEquals(Periodicidad.MENSUAL, inversion.periodo)
        assertEquals(1, inversion.cantidadDePeriodos)
        assertEquals(0.7105716f, inversion.tasaDeVariacion)
    }
}
