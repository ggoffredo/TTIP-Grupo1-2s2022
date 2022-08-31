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
                jsonPath("$.[0].type") {
                    value("fijo")
                }
                jsonPath("$.[0].medioDeGasto.nombre") {
                    value("Efectivo")
                }
                jsonPath("$.[5].descripcion") {
                    value("Pava Electrica")
                }
                jsonPath("$.[5].monto") {
                    value(4000)
                }
                jsonPath("$.[5].type") {
                    value("ocasional")
                }
                jsonPath("$.[5].medioDeGasto.nombre") {
                    value("Visa")
                }
                jsonPath("$.[5].fechaInicioDeCobro") {
                    isArray()
                }
                jsonPath("$.[5].cantidadDeCuotas") {
                    value(1)
                }
            }
        }
    }
}