package ar.edu.unq.ttip.llegarafindemes.integration

import ar.edu.unq.ttip.llegarafindemes.controllers.IngresosController
import ar.edu.unq.ttip.llegarafindemes.dtos.IngresoDto
import ar.edu.unq.ttip.llegarafindemes.models.Periodicidad
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import java.time.LocalDate

@SpringBootTest
class IngresosTest {

    private lateinit var mockMvc: MockMvc
    @Autowired
    private lateinit var subject: IngresosController

    @BeforeEach
    fun setUp() {
        this.mockMvc = MockMvcBuilders.standaloneSetup(this.subject).build()
    }

    @Test
    fun alPedirLosIngresosDeUnUsuarioSeObtienenLosIngresosHistoricosDelMismo() {
        this.mockMvc.get("/users/1/ingresos").andExpect {
            status { isOk() }
            content {
                jsonPath("$.[0].descripcion")   { value("Sueldo") }
                jsonPath("$.[0].monto")         { value(100000) }
                jsonPath("$.[0].periodicidad")  { value("MENSUAL") }
                jsonPath("$.[0].duracion")      { value(0) }
                jsonPath("$.[0].fecha")         { isArray() }
                jsonPath("$.[2].descripcion")   { value("Freelo") }
                jsonPath("$.[2].monto")         { value(10000) }
                jsonPath("$.[2].periodicidad")  { value("MENSUAL") }
                jsonPath("$.[2].duracion")      { value(1) }
                jsonPath("$.[2].fecha")         { isArray() }
            }
        }
    }

    @Test
    fun alPedirLosIngresosMensualizadosDeUnUsuarioSeObtienenLosIngresosSeparadosPorCadaMesHastaElMesAnteriorAlActual() {
        this.mockMvc.get("/users/1/ingresosMensualizados").andExpect {
            status { isOk() }
            content {
                jsonPath("$.[0].mes")                       { isArray() }
                jsonPath("$.[0].montoTotal")                { value(160000) }
                jsonPath("$.[0].ingresos.length()")         { value(3) }
                jsonPath("$.[0].ingresos.[0].descripcion")  { value("Sueldo") }
                jsonPath("$.[0].ingresos.[1].descripcion")  { value("Alquiler") }
                jsonPath("$.[0].ingresos.[2].descripcion")  { value("Freelo") }
                jsonPath("$.[1].mes")                       { isArray() }
                jsonPath("$.[1].montoTotal")                { value(165000) }
                jsonPath("$.[1].ingresos.length()")         { value(3) }
                jsonPath("$.[1].ingresos.[0].descripcion")  { value("Sueldo") }
                jsonPath("$.[1].ingresos.[1].descripcion")  { value("Alquiler") }
                jsonPath("$.[1].ingresos.[2].descripcion")  { value("Otro freelo") }
                jsonPath("$.[2].mes")                       { isArray() }
                jsonPath("$.[2].montoTotal")                { value(150000) }
                jsonPath("$.[2].ingresos.length()")         { value(2) }
                jsonPath("$.[2].ingresos.[0].descripcion")  { value("Sueldo") }
                jsonPath("$.[2].ingresos.[1].descripcion")  { value("Alquiler") }
            }
        }
    }

    @Test
    fun alCrearUnIngresoSeRetornaUn201() {
        val ingresoDto = IngresoDto("Freelo", 150000, Periodicidad.MENSUAL, 1, LocalDate.now())
        this.mockMvc.perform(
            MockMvcRequestBuilders.post("/users/1/ingresos")
                .contentType(MediaType.APPLICATION_JSON)
                .content(ObjectMapper().registerModule(JavaTimeModule()).writeValueAsString(ingresoDto))
        )
        .andExpect(MockMvcResultMatchers.status().isCreated)
        .andExpect(MockMvcResultMatchers.jsonPath("$.id").isNumber)
        .andExpect(MockMvcResultMatchers.jsonPath("$.descripcion").value("Freelo"))
        .andExpect(MockMvcResultMatchers.jsonPath("$.monto").value(150000))
        .andExpect(MockMvcResultMatchers.jsonPath("$.periodicidad").value("MENSUAL"))
        .andExpect(MockMvcResultMatchers.jsonPath("$.duracion").value(1))
        .andExpect(MockMvcResultMatchers.jsonPath("$.fecha").isArray)
    }

    @Test
    fun alCrearUnIngresoParaUnUsuarioInexistenteSeRetorna404() {
        val ingresoDto = IngresoDto("Freelo", 150000, Periodicidad.MENSUAL, 1, LocalDate.now())
        this.mockMvc.perform(
            MockMvcRequestBuilders.post("/users/123123/ingresos")
                .contentType(MediaType.APPLICATION_JSON)
                .content(ObjectMapper().registerModule(JavaTimeModule()).writeValueAsString(ingresoDto))
        )
        .andExpect(MockMvcResultMatchers.status().isNotFound)
    }

    @Test
    fun alPedirLosIngresosDeUnUsuarioInexistenteSeRetorna404() {
        this.mockMvc.get("/users/150/ingresos").andExpect {
            status { isNotFound() }
        }
    }
}