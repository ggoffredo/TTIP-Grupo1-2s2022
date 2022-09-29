package ar.edu.unq.ttip.llegarafindemes.unit.services

import ar.edu.unq.ttip.llegarafindemes.models.Gasto
import ar.edu.unq.ttip.llegarafindemes.models.MedioDePago
import ar.edu.unq.ttip.llegarafindemes.models.Periodicidad
import ar.edu.unq.ttip.llegarafindemes.models.Usuario
import ar.edu.unq.ttip.llegarafindemes.repositories.GastosRepository
import ar.edu.unq.ttip.llegarafindemes.services.AdministrablesService
import ar.edu.unq.ttip.llegarafindemes.services.GastosService
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.Mockito.*
import org.mockito.MockitoAnnotations
import org.mockito.Spy
import java.time.LocalDate

class GastosTest {

    @Mock
    lateinit var gastosRepositoryMock: GastosRepository
    @Spy
    lateinit var administrablesService: AdministrablesService

    @InjectMocks
    lateinit var subject: GastosService
    private lateinit var gastos: List<Gasto>

    @BeforeEach
    fun setUp() {
        MockitoAnnotations.openMocks(this)
        val gastoOcasional1 = buildGasto(Periodicidad.MENSUAL, 3, LocalDate.now().minusMonths(1), "Colchon inflable", 1500)
        val gastoOcasional2 = buildGasto(Periodicidad.MENSUAL, 12, LocalDate.now(), "Pava electrica", 1000)
        val gastoFijo1 = buildGasto(Periodicidad.MENSUAL, 0, LocalDate.now(), "Alquiler", 40000)
        val gastoFijo2 = buildGasto(Periodicidad.MENSUAL, 0, LocalDate.now(), "Expensas", 5000)
        this.gastos = listOf(gastoOcasional1, gastoOcasional2, gastoFijo1, gastoFijo2)
        `when`(gastosRepositoryMock.findByUsuarioIdOrderByFechaAsc(1)).thenReturn(this.gastos)
    }

    @Test
    fun cuandoSePidenLosGastosMensualizadosDeUnUsuarioConGastosEstosSeSeparanEnMesesSegunElGastoMasViejo() {
        val gastosMensualizados = this.subject.getGastosForUserPerMonth(1)
        assertEquals(gastosMensualizados.size, 2)
        verify(administrablesService, times(1)).getAdministrablesPerMonth(this.gastos)

        val gastosMesPosterior = gastosMensualizados.first()
        assertEquals(gastosMesPosterior.mes, LocalDate.now().minusMonths(1).withDayOfMonth(1))
        assertEquals(gastosMesPosterior.administrables.size, 1)
        assertEquals(gastosMesPosterior.montoTotal, 1500)

        val gastosMesEnCurso = gastosMensualizados.last()
        assertEquals(gastosMesEnCurso.mes, LocalDate.now().withDayOfMonth(1))
        assertEquals(gastosMesEnCurso.administrables.size, 4)
        assertEquals(gastosMesEnCurso.montoTotal, 47500)
    }

    @Test
    fun cuandoSePidenLosGastosMensualizadosDeUnUsuarioSinGastosSeRetornaUnaListaVaciaDeGastosMensualizados() {
        val emptyList = listOf<Gasto>()
        `when`(gastosRepositoryMock.findByUsuarioIdOrderByFechaAsc(2)).thenReturn(emptyList)
        val gastosMensualizados = this.subject.getGastosForUserPerMonth(2)
        verify(administrablesService, times(1)).getAdministrablesPerMonth(emptyList)
        assertEquals(gastosMensualizados.size, 0)
    }

    private fun buildGasto(periodicidad: Periodicidad, duracion: Int, fecha: LocalDate, descripcion: String, monto: Int): Gasto {
        val medioDePago = MedioDePago(1, "Visa")
        val usuario = Usuario(1, "Pepe", "Rodriguez", "peperodriguez@gmail.com", "UnaPassword")
        return Gasto(1, descripcion, monto, periodicidad, duracion, fecha, medioDePago, usuario)
    }
}