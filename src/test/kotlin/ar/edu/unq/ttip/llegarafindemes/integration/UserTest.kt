package ar.edu.unq.ttip.llegarafindemes.integration

import ar.edu.unq.ttip.llegarafindemes.controllers.UserController
import ar.edu.unq.ttip.llegarafindemes.models.Usuario
import com.fasterxml.jackson.databind.ObjectMapper
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import java.util.*

@SpringBootTest
class UserTest {

    private lateinit var mockMvc: MockMvc
    @Autowired
    private lateinit var subject: UserController

    @BeforeEach
    fun setUp() {
        this.mockMvc = MockMvcBuilders.standaloneSetup(this.subject).build()
    }

    @Test
    fun alIntentarIngresarConUnUsuarioInexistenteLaApiRetorna404() {
        this.mockMvc.perform(
            post("/login").header(
                HttpHeaders.AUTHORIZATION,
                "Basic " + Base64.getEncoder().encodeToString("user:password".toByteArray()))
        ).andExpect(status().isNotFound)
    }

    @Test
    fun alIntentarIngresarConUnUsuarioExistenteLaApiRetornaADichoUsuario() {
        this.mockMvc.perform(
            post("/login").header(
                HttpHeaders.AUTHORIZATION,
                "Basic " + Base64.getEncoder().encodeToString("peperamirez@gmail.com:UnaPassSuperCompleja".toByteArray()))
        )
        .andExpect(status().isOk)
        .andExpect(jsonPath("$.id").value(1))
        .andExpect(jsonPath("$.nombre").value("Pepe"))
        .andExpect(jsonPath("$.apellido").value("Ramirez"))
        .andExpect(jsonPath("$.email").value("peperamirez@gmail.com"))
    }

    @Test
    fun alIntentarRegistrarseConUnUsuarioExistenteLaApiRetorna403() {
        val user = Usuario(nombre = "Pepe", apellido = "Gomez", email = "peperamirez@gmail.com", password = "UnaPassword")
        this.mockMvc.perform(
            post("/register")
            .contentType(MediaType.APPLICATION_JSON)
            .content(ObjectMapper().writeValueAsString(user))
        ).andExpect(status().isForbidden)
    }

    @Test
    fun alIntentarRegistrarseConUnUsuarioInexistenteLaApiRetorna201() {
        val user = Usuario(nombre = "Pepe", apellido = "Ramirez", email = "otropeperamirez@gmail.com", password = "UnaPassword")
        this.mockMvc.perform(
            post("/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(ObjectMapper().writeValueAsString(user))
        )
        .andExpect(status().isCreated)
        .andExpect(jsonPath("$.length()").value(4))
        .andExpect(jsonPath("$.id").value(5))
        .andExpect(jsonPath("$.nombre").value("Pepe"))
        .andExpect(jsonPath("$.apellido").value("Ramirez"))
        .andExpect(jsonPath("$.email").value("otropeperamirez@gmail.com"))
    }
}