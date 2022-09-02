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
                    value("Sueldo")
                }
                jsonPath("$.[0].monto") {
                    value(100000)
                }
                jsonPath("$.[0].periodicidad") {
                    value("MENSUAL")
                }
                jsonPath("$.[0].duracion") {
                    value(0)
                }
                jsonPath("$.[0].fecha") {
                    isArray()
                }
                jsonPath("$.[2].descripcion") {
                    value("Freelo")
                }
                jsonPath("$.[2].monto") {
                    value(10000)
                }
                jsonPath("$.[2].periodicidad") {
                    value("MENSUAL")
                }
                jsonPath("$.[2].duracion") {
                    value(1)
                }
                jsonPath("$.[2].fecha") {
                    isArray()
                }
            }
        }
    }
}