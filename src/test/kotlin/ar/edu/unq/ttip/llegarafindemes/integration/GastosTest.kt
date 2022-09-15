package ar.edu.unq.ttip.llegarafindemes.integration

import ar.edu.unq.ttip.llegarafindemes.controllers.GastosController
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get
import org.springframework.test.web.servlet.setup.MockMvcBuilders

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
                jsonPath("$.[5].descripcion")           { value("Pava Electrica") }
                jsonPath("$.[5].monto")                 { value(4000) }
                jsonPath("$.[5].periodicidad")          { value("MENSUAL") }
                jsonPath("$.[5].duracion")              { value(12) }
                jsonPath("$.[5].medioDePago.nombre")    { value("Visa") }
                jsonPath("$.[5].fecha")                 { isArray() }
            }
        }
    }

    @Test
    fun alPedirLosGastosMensualizadosDeUnUsuarioSeObtienenLosGastosSeparadosPorCadaMesHastaElMesActual() {
        // TODO: Deberíamos mockear el LocalDate.now para evitar que el test rompa más adelante
        // https://stackoverflow.com/questions/32792000/how-can-i-mock-java-time-localdate-now
        this.mockMvc.get("/users/1/gastosMensualizados").andExpect {
            status { isOk() }
            content {
                jsonPath("$.[0].mes")                       { isArray() }
                jsonPath("$.[0].montoTotal")                { value(35000) }
                jsonPath("$.[0].gastos.length()")           { value(2) }
                jsonPath("$.[0].gastos.[0].descripcion")    { value("Expensas") }
                jsonPath("$.[0].gastos.[1].descripcion")    { value("Alquiler") }
                jsonPath("$.[1].mes")                       { isArray() }
                jsonPath("$.[1].montoTotal")                { value(43000) }
                jsonPath("$.[1].gastos.length()")           { value(4) }
                jsonPath("$.[1].gastos.[0].descripcion")    { value("Expensas") }
                jsonPath("$.[1].gastos.[1].descripcion")    { value("Alquiler") }
                jsonPath("$.[1].gastos.[2].descripcion")    { value("Pava Electrica") }
                jsonPath("$.[1].gastos.[3].descripcion")    { value("Telecentro") }
                jsonPath("$.[2].mes")                       { isArray() }
                jsonPath("$.[2].montoTotal")                { value(49500) }
                jsonPath("$.[2].gastos.length()")           { value(6) }
                jsonPath("$.[2].gastos.[0].descripcion")    { value("Expensas") }
                jsonPath("$.[2].gastos.[1].descripcion")    { value("Alquiler") }
                jsonPath("$.[2].gastos.[2].descripcion")    { value("Pava Electrica") }
                jsonPath("$.[2].gastos.[3].descripcion")    { value("Telecentro") }
                jsonPath("$.[2].gastos.[4].descripcion")    { value("Rappi") }
                jsonPath("$.[2].gastos.[5].descripcion")    { value("Gimnasio") }
            }
        }
    }
}