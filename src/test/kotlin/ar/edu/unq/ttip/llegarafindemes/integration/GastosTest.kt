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
    fun getGastosTest() {
        this.mockMvc.get("/users/1/gastos").andExpect {
            status { isOk() }
            content {
                jsonPath("$.[0].descripcion") {
                    value("Alquiler")
                }
                jsonPath("$.[0].monto") {
                    value(30000)
                }
                jsonPath("$.[0].periodicidad") {
                    value("MENSUAL")
                }
                jsonPath("$.[0].duracion") {
                    value(0)
                }
                jsonPath("$.[0].medioDePago.nombre") {
                    value("Efectivo")
                }
                jsonPath("$.[5].descripcion") {
                    value("Pava Electrica")
                }
                jsonPath("$.[5].monto") {
                    value(4000)
                }
                jsonPath("$.[5].periodicidad") {
                    value("MENSUAL")
                }
                jsonPath("$.[5].duracion") {
                    value(12)
                }
                jsonPath("$.[5].medioDePago.nombre") {
                    value("Visa")
                }
                jsonPath("$.[5].fecha") {
                    isArray()
                }
            }
        }
    }
}