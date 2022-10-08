package ar.edu.unq.ttip.llegarafindemes.unit.services

import ar.edu.unq.ttip.llegarafindemes.helpers.RestTemplateHelper
import ar.edu.unq.ttip.llegarafindemes.models.Periodicidad
import ar.edu.unq.ttip.llegarafindemes.services.BcraApiService
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.*
import org.mockito.Mockito.*
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity

class BcraApiTest {

    @Mock(answer = Answers.RETURNS_SELF)
    lateinit var restTemplateHelper: RestTemplateHelper

    @InjectMocks
    lateinit var bcraApiService: BcraApiService

    @BeforeEach
    fun setUp() {
        MockitoAnnotations.openMocks(this)
    }

    @AfterEach
    fun tearDown() {
        reset(restTemplateHelper)
    }

    @Test
    fun enBaseALaPaginaDelINDECSeObtieneElIPCDelUltimoMes(){
        this.setUpIPCMock()
        val ipc = bcraApiService.getLastMonthIPC()
        assertEquals("7.1", ipc.value)
        assertEquals("31-08-2022", ipc.month)
    }

    @Test
    fun enBaseALaApiDeEstadisticaBCRASeObtieneElIPCDelLosUltimosMeses(){
        this.setUpIPCMock()
        val ipcs = bcraApiService.getIPCByMonth()
        assertEquals(6, ipcs.size)
        assertEquals("6.7", ipcs.first().value)
        assertEquals("31-03-2022", ipcs.first().month)
        assertEquals("7.1", ipcs.last().value)
        assertEquals("31-08-2022", ipcs.last().month)
    }

    @Test
    fun enBaseAUnaListaDeValoresDeUVASeRetornaLaInversionPlazoFijoUvaConLaTasaDeVariacionCalculada(){
        this.setUpPlazoFijoUvaMock()
        val inversion = bcraApiService.getPlazoFijoUvaAsInversion()
        assertEquals("Plazo Fijo Uva", inversion.nombre)
        assertEquals("PlazoFijo", inversion.tipoDeInversion)
        assertEquals(Periodicidad.MENSUAL, inversion.periodo)
        assertEquals(1, inversion.cantidadDePeriodos)
        assertEquals(1.3606663f, inversion.tasaDeVariacion)
    }

    @Test
    fun enBaseAUnaListaDeValoresDelDolarBlueSeRetornaLaInversionDolarBlueConLaTasaDeVariacionCalculada(){
        this.setUpDolarBlueMock()
        val inversion = bcraApiService.getDolarBlueAsInversion()
        assertEquals("Dolar Blue", inversion.nombre)
        assertEquals("Dolar", inversion.tipoDeInversion)
        assertEquals(Periodicidad.MENSUAL, inversion.periodo)
        assertEquals(1, inversion.cantidadDePeriodos)
        assertEquals(14.957251f, inversion.tasaDeVariacion)
    }

    private fun setUpDolarBlueMock() {
        val response = ResponseEntity(
            arrayOf(
                linkedMapOf("d" to "07-10-2022", "v" to "258.47"),
                linkedMapOf("d" to "08-10-2022", "v" to "297.13"),
            ) as Array<Any>,
            HttpStatus.OK
        )
        `when`(restTemplateHelper.addUrl(anyString()).addBearer(anyString()).getForEntity((Array<Any>::class.java))).thenReturn(response)
    }

    private fun setUpPlazoFijoUvaMock() {
        val response = ResponseEntity(
            arrayOf(
                linkedMapOf("d" to "07-10-2022", "v" to "155.07"),
                linkedMapOf("d" to "08-10-2022", "v" to "157.18"),
            ) as Array<Any>,
            HttpStatus.OK
        )
        `when`(restTemplateHelper.addUrl(anyString()).addBearer(anyString()).getForEntity((Array<Any>::class.java))).thenReturn(response)
    }

    private fun setUpIPCMock() {
        val response = ResponseEntity(
            arrayOf(
                linkedMapOf("d" to "31-03-2022", "v" to "6.7"),
                linkedMapOf("d" to "31-04-2022", "v" to "6.1"),
                linkedMapOf("d" to "31-05-2022", "v" to "5.1"),
                linkedMapOf("d" to "31-06-2022", "v" to "5.3"),
                linkedMapOf("d" to "31-07-2022", "v" to "7.4"),
                linkedMapOf("d" to "31-08-2022", "v" to "7.1")
            ) as Array<Any>,
            HttpStatus.OK
        )
        `when`(restTemplateHelper.addUrl(anyString()).addBearer(anyString()).getForEntity((Array<Any>::class.java))).thenReturn(response)
    }

}