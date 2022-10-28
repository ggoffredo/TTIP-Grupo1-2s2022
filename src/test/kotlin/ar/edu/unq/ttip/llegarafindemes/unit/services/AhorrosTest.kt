package ar.edu.unq.ttip.llegarafindemes.unit.services

import ar.edu.unq.ttip.llegarafindemes.dtos.GastosMensualizados
import ar.edu.unq.ttip.llegarafindemes.dtos.IngresosMensualizados
import ar.edu.unq.ttip.llegarafindemes.models.*
import ar.edu.unq.ttip.llegarafindemes.services.AhorrosService
import ar.edu.unq.ttip.llegarafindemes.services.GastosService
import ar.edu.unq.ttip.llegarafindemes.services.IngresosService
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.Mockito.*
import org.mockito.MockitoAnnotations
import java.time.LocalDate

class AhorrosTest {

    @Mock
    private lateinit var gastosService: GastosService
    @Mock
    private lateinit var ingresosService: IngresosService
    @InjectMocks
    private lateinit var ahorrosService: AhorrosService

    @BeforeEach
    fun setUp() {
        MockitoAnnotations.openMocks(this)
    }

    @Test
    fun dadoTresMesesConIngresosYGastosCuandoSePidenLosAhorrosConUnaAmplitudDe2MesesSeAgregaUnMesFuturoConLosAhorrosEsperados() {
        // Gastos = Mes 1: $14.000 Mes 2: $9.000 Mes 3: $7.000
        `when`(gastosService.getGastosForUserPerMonth(anyInt(), any(), any())).thenReturn(
            listOf(
                GastosMensualizados(LocalDate.now().minusMonths(2), buildGastos()),
                GastosMensualizados(LocalDate.now().minusMonths(1), buildGastos(2000, 3000, 4000)),
                GastosMensualizados(LocalDate.now(), buildGastos(1000, 1000, 5000))
            )
        )
        // Ingresos = Mes 1,2,3: $35.000
        `when`(ingresosService.getIngresosForUserPerMonth(anyInt(), any(), any())).thenReturn(
            listOf(
                IngresosMensualizados(LocalDate.now().minusMonths(2), buildIngresos()),
                IngresosMensualizados(LocalDate.now().minusMonths(1), buildIngresos()),
                IngresosMensualizados(LocalDate.now(), buildIngresos())
            )
        )
        // Ahorros = Mes 1: $21.000 Mes 2: $26.000 Mes 3: $28.000
        // Promedio ahorro mes 4 = $75.000 / 3 -> 25.000
        // Cantidad de meses 2 -> 2 meses para atrás + mes actual + mes siguiente
        val result = this.ahorrosService.getAhorros(1, 2)
        assertEquals(4, result.size)
        assertEquals(25000, result.last().actual)
        assertEquals(100000, result.last().acumulado)
    }

    @Test
    fun dadoDosMesesConIngresosYGastosCuandoSePidenLosAhorrosConUnaAmplitudDe2MesesSeAgregaUnMesFuturoConLosAhorrosEsperados() {
        // Gastos = Mes 1: $0 Mes 2: $9.000 Mes 3: $7.000
        `when`(gastosService.getGastosForUserPerMonth(anyInt(), any(), any())).thenReturn(
            listOf(
                GastosMensualizados(LocalDate.now().minusMonths(2), buildGastos(0, 0, 0)),
                GastosMensualizados(LocalDate.now().minusMonths(1), buildGastos(2000, 3000, 4000)),
                GastosMensualizados(LocalDate.now(), buildGastos(1000, 1000, 5000))
            )
        )
        // Ingresos = Mes 1: $0 Mes 2,3: $35.000
        `when`(ingresosService.getIngresosForUserPerMonth(anyInt(), any(), any())).thenReturn(
            listOf(
                IngresosMensualizados(LocalDate.now().minusMonths(2), buildIngresos(0, 0, 0)),
                IngresosMensualizados(LocalDate.now().minusMonths(1), buildIngresos()),
                IngresosMensualizados(LocalDate.now(), buildIngresos())
            )
        )
        // Ahorros = Mes 1: $0 Mes 2: $26.000 Mes 3: $28.000
        // Promedio ahorro mes 4 = $54.000 / 2 -> 27.000 (Al no tener ingresos ni gastos en el primer mes, no se cuenta para el promedio de ahorro)
        // Cantidad de meses 2 -> 2 meses para atrás + mes actual + mes siguiente
        val result = this.ahorrosService.getAhorros(1, 2)
        assertEquals(4, result.size)
        assertEquals(27000, result.last().actual)
        assertEquals(81000, result.last().acumulado)
    }

    @Test
    fun dadoTresMesesConIngresosYGastosPeroSinAhorrosElPrimerMesCuandoSePidenLosAhorrosConUnaAmplitudDe2MesesSeAgregaUnMesFuturoConLosAhorrosEsperados() {
        // Gastos = Mes 1: $6000 Mes 2: $9.000 Mes 3: $7.000
        `when`(gastosService.getGastosForUserPerMonth(anyInt(), any(), any())).thenReturn(
            listOf(
                GastosMensualizados(LocalDate.now().minusMonths(2), buildGastos(1000, 2000, 3000)),
                GastosMensualizados(LocalDate.now().minusMonths(1), buildGastos(2000, 3000, 4000)),
                GastosMensualizados(LocalDate.now(), buildGastos(1000, 1000, 5000))
            )
        )
        // Ingresos = Mes 1: $6000 Mes 2,3: $35.000
        `when`(ingresosService.getIngresosForUserPerMonth(anyInt(), any(), any())).thenReturn(
            listOf(
                IngresosMensualizados(LocalDate.now().minusMonths(2), buildIngresos(1000, 2000, 3000)),
                IngresosMensualizados(LocalDate.now().minusMonths(1), buildIngresos()),
                IngresosMensualizados(LocalDate.now(), buildIngresos())
            )
        )
        // Ahorros = Mes 1: $0 Mes 2: $26.000 Mes 3: $28.000
        // Promedio ahorro mes 4 = $54.000 / 3 -> 18.000 (Ahorros 0 en el primer mes porque se netean los gastos e ingresos, se cuenta para el promedio)
        // Cantidad de meses 2 -> 2 meses para atrás + mes actual + mes siguiente
        val result = this.ahorrosService.getAhorros(1, 2)
        assertEquals(4, result.size)
        assertEquals(18000, result.last().actual)
        assertEquals(72000, result.last().acumulado)
    }

    private fun buildGastos(monto1: Int = 1000, monto2: Int = 5000, monto3: Int = 8000): List<Gasto> {
        val gasto1 = buildGasto("Gasto1", monto1)
        val gasto2 = buildGasto("Gasto2", monto2)
        val gasto3 = buildGasto("Gasto3", monto3)
        return listOf(gasto1, gasto2, gasto3)
    }

    private fun buildIngresos(monto1: Int = 2000, monto2: Int = 10000, monto3: Int = 23000): List<Ingreso> {
        val ingreso1 = buildIngreso("Ingreso1", monto1)
        val ingreso2 = buildIngreso("Ingreso2", monto2)
        val ingreso3 = buildIngreso("Ingreso3", monto3)
        return listOf(ingreso1, ingreso2, ingreso3)
    }

    private fun buildGasto(
        descripcion: String,
        monto: Int,
        periodicidad: Periodicidad = Periodicidad.MENSUAL,
        duracion: Int = 1,
        fecha: LocalDate = LocalDate.now()
    ): Gasto {
        val medioDePago = MedioDePago(1, "Visa")
        return Gasto(1, descripcion, monto, periodicidad, duracion, fecha, medioDePago, this.getUsuario())
    }

    private fun buildIngreso(
        descripcion: String,
        monto: Int,
        periodicidad: Periodicidad = Periodicidad.MENSUAL,
        duracion: Int = 1,
        fecha: LocalDate = LocalDate.now()
    ): Ingreso {
        return Ingreso(1, descripcion, monto, periodicidad, duracion, fecha, this.getUsuario())
    }

    private fun getUsuario(): Usuario {
        return Usuario(1, "Pepe", "Rodriguez", "peperodriguez@gmail.com", "UnaPassword")
    }
}