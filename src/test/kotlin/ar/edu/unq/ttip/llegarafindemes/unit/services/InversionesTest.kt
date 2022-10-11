package ar.edu.unq.ttip.llegarafindemes.unit.services

import ar.edu.unq.ttip.llegarafindemes.models.Inversion
import ar.edu.unq.ttip.llegarafindemes.models.PFijo
import ar.edu.unq.ttip.llegarafindemes.models.Periodicidad
import ar.edu.unq.ttip.llegarafindemes.services.AmbitoService
import ar.edu.unq.ttip.llegarafindemes.services.BcraApiService
import ar.edu.unq.ttip.llegarafindemes.services.BcraScrapperService
import ar.edu.unq.ttip.llegarafindemes.services.InversionesService
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.Mockito.`when`
import org.mockito.MockitoAnnotations

class InversionesTest {

    @Mock
    lateinit var bcraScrapperService: BcraScrapperService
    @Mock
    lateinit var bcraApiService: BcraApiService
    @Mock
    lateinit var ambitoService: AmbitoService

    @InjectMocks
    lateinit var inversionesService: InversionesService

    @BeforeEach
    fun setUp() {
        MockitoAnnotations.openMocks(this)
        `when`(ambitoService.getDolarAhorroAsInversion()).thenReturn(this.buildInversion("Dolar Turista", 1.1f, "Dolar"))
        `when`(ambitoService.getDolarBolsaAsInversion()).thenReturn(this.buildInversion("Dolar Bolsa", 2.1f, "Dolar"))
        `when`(bcraApiService.getDolarBlueAsInversion()).thenReturn(this.buildInversion("Dolar Blue", 0.4f, "Dolar"))
        `when`(bcraApiService.getPlazoFijoUvaAsInversion()).thenReturn(this.buildInversion("Plazo Fijo Uva", 3.2f, "PlazoFijo"))
        `when`(bcraScrapperService.getAllPFOptions()).thenReturn(mutableListOf(this.buildPlazoFijo()))
    }

    @Test
    fun cuandoSePidenLasInversionesSeObtieneLasInversionesParaDolaresYPlazosFijos() {
        val inversiones = inversionesService.getInversiones()
        assertEquals(2, inversiones.size)
        assertEquals(2, inversiones.values.first().size)
        assertEquals(3, inversiones.values.last().size)
    }

    private fun buildInversion(nombre: String, tasa: Float, tipo: String): Inversion {
        return Inversion(nombre, tasa, Periodicidad.MENSUAL, 1, tipo)
    }

    private fun buildPlazoFijo(): PFijo {
        return PFijo(
            1,
            "7",
            "Banco Galicia",
            "2022-08-12",
            "PLAZOFIJOTRADTASAREGULADA",
            "PFTRADTASAREGULADA",
            "Pesos",
            "100",
            "30 dias",
            "Home Banking",
            "70",
            "Todo el territorio nacional",
            ""
        )
    }
}