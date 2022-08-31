package ar.edu.unq.ttip.llegarafindemes.integration

import ar.edu.unq.ttip.llegarafindemes.controllers.IngresosController
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get
import org.springframework.test.web.servlet.setup.MockMvcBuilders

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
    fun getIngresosTest() {
        this.mockMvc.get("/users/1/ingresos").andExpect {
            status { isOk() }
            content {
                jsonPath("$.[0].descripcion") {
                    value("sueldo")
                }
                jsonPath("$.[0].monto") {
                    value(100000)
                }
                jsonPath("$.[0].type") {
                    value("fijo")
                }
                jsonPath("$.[2].descripcion") {
                    value("Freelo")
                }
                jsonPath("$.[2].monto") {
                    value(10000)
                }
                jsonPath("$.[2].type") {
                    value("ocasional")
                }
                jsonPath("$.[2].fechaIngreso") {
                    isArray()
                }
            }
        }
    }
}