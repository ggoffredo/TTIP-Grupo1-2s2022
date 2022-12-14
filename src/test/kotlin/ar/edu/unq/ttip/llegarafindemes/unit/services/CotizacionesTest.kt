package ar.edu.unq.ttip.llegarafindemes.unit.services

import ar.edu.unq.ttip.llegarafindemes.helpers.RestTemplateHelper
import ar.edu.unq.ttip.llegarafindemes.services.CotizacionesService
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.*
import org.mockito.Mockito.*
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity

class CotizacionesTest {

    @Mock(answer = Answers.RETURNS_SELF)
    lateinit var restTemplateHelper: RestTemplateHelper

    @InjectMocks
    lateinit var cotizacionesService: CotizacionesService

    @BeforeEach
    fun setUp() {
        MockitoAnnotations.openMocks(this)
    }

    @AfterEach
    fun tearDown() {
        reset(restTemplateHelper)
    }

    @Test
    fun enBaseALaApiDeDolarSiSeObtieneLasCotizacionesDelDolar(){
        this.setUpDolarSiMock()
        val dolares = cotizacionesService.getDolares()
        assertEquals("Dolar Blue", dolares[0].nombre)
        assertEquals(282.00f, dolares[0].venta)
        assertEquals("Dolar Bolsa", dolares[1].nombre)
        assertEquals(294.130f, dolares[1].venta)
        assertEquals("Dolar turista", dolares[2].nombre)
        assertEquals(272.69f, dolares[2].venta)
    }


    private fun setUpDolarSiMock() {
        val response = ResponseEntity(
            arrayOf(
                linkedMapOf("casa" to linkedMapOf("venta" to "282.00", "nombre" to "Dolar Blue")),
                linkedMapOf("casa" to linkedMapOf("venta" to "294.130", "nombre" to "Dolar Bolsa")),
                linkedMapOf("casa" to linkedMapOf("venta" to "272.69", "nombre" to "Dolar turista")),
            ) as Array<Any>,
            HttpStatus.OK
        )
        `when`(restTemplateHelper.addUrl(anyString()).addBearer(anyString()).getForEntity((Array<Any>::class.java))).thenReturn(response)
    }
}