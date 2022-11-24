package ar.edu.unq.ttip.llegarafindemes.integration

import ar.edu.unq.ttip.llegarafindemes.controllers.GastosController
import ar.edu.unq.ttip.llegarafindemes.dtos.GastoDto
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
class GastosTest {

    private lateinit var mockMvc: MockMvc
    @Autowired
    private lateinit var subject: GastosController

    @BeforeEach
    fun setUp() {
        this.mockMvc = MockMvcBuilders.standaloneSetup(this.subject).build()
    }

    @Test
    fun alPedirLosGastosDeUnUsuarioSeObtienenLosGastosHistoricosDelMismo() {
        this.mockMvc.get("/users/1/gastos").andExpect {
            status { isOk() }
            content {
                jsonPath("$.[0].descripcion")           { value("Alquiler") }
                jsonPath("$.[0].monto")                 { value(30000) }
                jsonPath("$.[0].periodicidad")          { value("MENSUAL") }
                jsonPath("$.[0].duracion")              { value(0) }
                jsonPath("$.[0].medioDePago.nombre")    { value("Efectivo") }
                jsonPath("$.[5].descripcion")           { value("Supermercado") }
                jsonPath("$.[5].monto")                 { value(8000) }
                jsonPath("$.[5].periodicidad")          { value("MENSUAL") }
                jsonPath("$.[5].duracion")              { value(1) }
                jsonPath("$.[5].medioDePago.nombre")    { value("Visa") }
                jsonPath("$.[5].fecha")                 { isArray() }
            }
        }
    }

    @Test
    fun alPedirLosGastosMensualizadosDeUnUsuarioSeObtienenLosGastosSeparadosPorCadaMesHastaElMesActual() {
        this.mockMvc.get("/users/1/gastosMensualizados").andExpect {
            status { isOk() }
            content {
                jsonPath("$.[0].mes")                       { isArray() }
                jsonPath("$.[0].montoTotal")                { value(35000) }
                jsonPath("$.[0].gastos.length()")           { value(2) }
                jsonPath("$.[0].gastos.[0].descripcion")    { value("Alquiler") }
                jsonPath("$.[0].gastos.[1].descripcion")    { value("Expensas") }
                jsonPath("$.[1].mes")                       { isArray() }
                jsonPath("$.[1].montoTotal")                { value(43000) }
                jsonPath("$.[1].gastos.length()")           { value(4) }
                jsonPath("$.[1].gastos.[0].descripcion")    { value("Alquiler") }
                jsonPath("$.[1].gastos.[1].descripcion")    { value("Expensas") }
                jsonPath("$.[1].gastos.[2].descripcion")    { value("Pava Electrica") }
                jsonPath("$.[1].gastos.[3].descripcion")    { value("Telecentro") }
                jsonPath("$.[2].mes")                       { isArray() }
                jsonPath("$.[2].montoTotal")                { value(47000) }
                jsonPath("$.[2].gastos.length()")           { value(5) }
                jsonPath("$.[2].gastos.[0].descripcion")    { value("Alquiler") }
                jsonPath("$.[2].gastos.[1].descripcion")    { value("Expensas") }
                jsonPath("$.[2].gastos.[2].descripcion")    { value("Pava Electrica") }
                jsonPath("$.[2].gastos.[3].descripcion")    { value("Telecentro") }
                jsonPath("$.[2].gastos.[4].descripcion")    { value("Gimnasio") }
            }
        }
    }

    @Test
    fun alCrearUnGastoSeRetornaUn201() {
        val gastoDto = GastoDto("Coto", 15000, Periodicidad.MENSUAL, 1, LocalDate.now())
        this.mockMvc.perform(
            MockMvcRequestBuilders.post("/users/1/gastos")
                .contentType(MediaType.APPLICATION_JSON)
                .content(ObjectMapper().registerModule(JavaTimeModule()).writeValueAsString(gastoDto))
        )
        .andExpect(MockMvcResultMatchers.status().isCreated)
        .andExpect(MockMvcResultMatchers.jsonPath("$.id").isNumber)
        .andExpect(MockMvcResultMatchers.jsonPath("$.descripcion").value("Coto"))
        .andExpect(MockMvcResultMatchers.jsonPath("$.monto").value(15000))
        .andExpect(MockMvcResultMatchers.jsonPath("$.periodicidad").value("MENSUAL"))
        .andExpect(MockMvcResultMatchers.jsonPath("$.duracion").value(1))
        .andExpect(MockMvcResultMatchers.jsonPath("$.fecha").isArray)
        .andExpect(MockMvcResultMatchers.jsonPath("$.medioDePago.id").isNumber)
        .andExpect(MockMvcResultMatchers.jsonPath("$.medioDePago.nombre").value("Visa"))
    }

    @Test
    fun alCrearUnGastoParaUnUsuarioInexistenteSeRetorna404() {
        val gastoDto = GastoDto("Coto", 15000, Periodicidad.MENSUAL, 1, LocalDate.now())
        this.mockMvc.perform(
            MockMvcRequestBuilders.post("/users/1123/gastos")
                .contentType(MediaType.APPLICATION_JSON)
                .content(ObjectMapper().registerModule(JavaTimeModule()).writeValueAsString(gastoDto))
        )
        .andExpect(MockMvcResultMatchers.status().isNotFound)
    }

    @Test
    fun alPedirLosGastosDeUnUsuarioInexistenteSeRetorna404() {
        this.mockMvc.get("/users/150/gastos").andExpect {
            status { isNotFound() }
        }
    }
}