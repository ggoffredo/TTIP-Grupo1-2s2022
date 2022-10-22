package ar.edu.unq.ttip.llegarafindemes.integration

import ar.edu.unq.ttip.llegarafindemes.controllers.IPCController
import ar.edu.unq.ttip.llegarafindemes.models.Ipc
import ar.edu.unq.ttip.llegarafindemes.services.BcraApiService
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.Mockito
import org.mockito.MockitoAnnotations
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get
import org.springframework.test.web.servlet.setup.MockMvcBuilders

class ControllerTest {
    @Mock
    private lateinit var bcraApiServiceMock: BcraApiService

    @InjectMocks
    private lateinit var  ipcController: IPCController
    private lateinit var mockMvc: MockMvc

    @BeforeEach
    fun setUp(){
        MockitoAnnotations.openMocks(this)
        this.mockMvc = MockMvcBuilders.standaloneSetup(this.ipcController).build()
    }

    @Test
    fun gestInflacionEsperadaTest(){
        Mockito.`when`(this.bcraApiServiceMock.getInflacionEsperada()).thenReturn("94.1")
        this.mockMvc.get("/inflacionEsperada").andExpect {
            status { isOk() }
            content { string("94.1") }
        }
    }

    @Test
    fun gestIpcTest(){
        Mockito.`when`(this.bcraApiServiceMock.getLastMonthIPC()).thenReturn(Ipc("31-08-2022","7.1"))
        this.mockMvc.get("/ipc").andExpect {
            status { isOk() }
            content {
                jsonPath("$.month") {value("31-08-2022")}
                jsonPath("$.value") {value("7.1")}
            }
        }
    }

    @Test
    fun gestIpcMensualesTest(){
        Mockito.`when`(this.bcraApiServiceMock.getIPCByMonth()).thenReturn(listOf( Ipc("31-08-2022","7.1"),Ipc("31-09-2022","7.3")))
        this.mockMvc.get("/ipcMensuales").andExpect {
            status { isOk() }
            content {
                jsonPath("$.[0].month") {value("31-08-2022")}
                jsonPath("$.[0].value") {value("7.1")}
                jsonPath("$.[1].month") {value("31-09-2022")}
                jsonPath("$.[1].value") {value("7.3")}
            }
        }
    }
}