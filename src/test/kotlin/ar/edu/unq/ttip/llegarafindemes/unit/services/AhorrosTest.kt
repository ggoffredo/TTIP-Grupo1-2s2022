package ar.edu.unq.ttip.llegarafindemes.unit.services

import ar.edu.unq.ttip.llegarafindemes.dtos.GastosMensualizados
import ar.edu.unq.ttip.llegarafindemes.dtos.IngresosMensualizados
import ar.edu.unq.ttip.llegarafindemes.exceptions.InvestmentNotFoundException
import ar.edu.unq.ttip.llegarafindemes.models.*
import ar.edu.unq.ttip.llegarafindemes.services.AhorrosService
import ar.edu.unq.ttip.llegarafindemes.services.GastosService
import ar.edu.unq.ttip.llegarafindemes.services.IngresosService
import ar.edu.unq.ttip.llegarafindemes.services.InversionesService
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
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
    @Mock
    private lateinit var inversionesService: InversionesService
    @InjectMocks
    private lateinit var ahorrosService: AhorrosService

    @BeforeEach
    fun setUp() {
        MockitoAnnotations.openMocks(this)
    }

    @Test
    fun dadoTresMesesConIngresosYGastosCuandoSePidenLosAhorrosConUnaAmplitudDe2MesesSeAgreganDosMesesFuturosConLosAhorrosEsperados() {
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
        // Cantidad de meses 2 -> 2 meses para atrás + mes actual + 2 meses siguientes
        val result = this.ahorrosService.getAhorros(1, 2)
        assertEquals(5, result.size)
        assertEquals(21000, result[0].acumulado)
        assertEquals(47000, result[1].acumulado)
        assertEquals(75000, result[2].acumulado)
        assertEquals(100000, result[3].acumulado)
        assertEquals(125000, result.last().acumulado)
        assertEquals(25000, result.last().actual)
    }

    @Test
    fun dadoDosMesesConIngresosYGastosCuandoSePidenLosAhorrosConUnaAmplitudDe2MesesSeAgreganDosMesesFuturosConLosAhorrosEsperados() {
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
        // Cantidad de meses 2 -> 2 meses para atrás + mes actual + 2 meses siguientes
        val result = this.ahorrosService.getAhorros(1, 2)
        assertEquals(5, result.size)
        assertEquals(27000, result.last().actual)
        assertEquals(108000, result.last().acumulado)
    }

    @Test
    fun dadoTresMesesConIngresosYGastosPeroSinAhorrosElPrimerMesCuandoSePidenLosAhorrosConUnaAmplitudDe2MesesSeAgreganDosMesesFuturosConLosAhorrosEsperados() {
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
        // Cantidad de meses 2 -> 2 meses para atrás + mes actual + 2 meses siguientes
        val result = this.ahorrosService.getAhorros(1, 2)
        assertEquals(5, result.size)
        assertEquals(18000, result.last().actual)
        assertEquals(90000, result.last().acumulado)
    }

    @Test
    fun dadoTresMesesConIngresosYGastosCuandoSePidenLosAhorrosConInversionConUnaAmplitudDe2MesesSeAgreganDosMesesFuturosConLosAhorrosEsperadosInvertidos() {
        `when`(inversionesService.getInversiones()).thenReturn(
            hashMapOf(
                "Plazos Fijos" to listOf(Inversion("Plazo Fijo Galicia", 7f, Periodicidad.MENSUAL, 1, "PlazoFijo"))
            )
        )
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
        // Cantidad de meses 2 -> 2 meses para atrás + mes actual + 2 meses siguientes
        val result = this.ahorrosService.getAhorrosConInversionAplicada(1, 2, "Plazo Fijo Galicia", false)
        assertEquals(5, result.size)
        assertEquals(21000, result[0].acumulado)
        assertEquals(48470, result[1].acumulado) // $26.000 + 7% de $21.000 ($1.470)
        assertEquals(79862, result[2].acumulado) // $28.000 + $48.470 + 7% de $48.470 ($3.392)
        assertEquals(110453, result[3].acumulado) // $25.000 + $79.862 + 7% de $79.862 (5.590)
        assertEquals(143184, result.last().acumulado) // $25.000 + $110.453 + 7% de $110.453 ($7.731)
    }

    @Test
    fun dadoTresMesesConIngresosYGastosCuandoSePidenLosAhorrosConInversionConUnaAmplitudDe2MesesSeAgreganDosMesesFuturosConLosAhorrosFuturosInvertidos() {
        `when`(inversionesService.getInversiones()).thenReturn(
            hashMapOf(
                "Plazos Fijos" to listOf(Inversion("Plazo Fijo Galicia", 7f, Periodicidad.MENSUAL, 1, "PlazoFijo"))
            )
        )
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
        // Cantidad de meses 2 -> 2 meses para atrás + mes actual + 2 meses siguientes
        val result = this.ahorrosService.getAhorrosConInversionAplicada(1, 2, "Plazo Fijo Galicia")
        assertEquals(5, result.size)
        assertEquals(21000, result[0].acumulado) // Mes pasado no se invierte
        assertEquals(47000, result[1].acumulado) // Mes pasado no se invierte
        assertEquals(75000, result[2].acumulado) // Este acumulado es invertido (mes actual)
        assertEquals(105250, result[3].acumulado) // $25.000 + $75.000 + 7% de $75.000 (5.250)
        assertEquals(137617, result.last().acumulado) // $25.000 + $105.250 + 7% de $105.250 ($7.367)
    }

    @Test
    fun dadoTresMesesConIngresosYGastosYUnMesConResultadoNegativoCuandoSePidenLosAhorrosConInversionConUnaAmplitudDe2MesesSeAgreganDosMesesFuturosConLosAhorrosFuturosInvertidos() {
        `when`(inversionesService.getInversiones()).thenReturn(
            hashMapOf(
                "Plazos Fijos" to listOf(Inversion("Plazo Fijo Galicia", 7f, Periodicidad.MENSUAL, 1, "PlazoFijo"))
            )
        )
        // Gastos = Mes 1: $14.000 Mes 2: $9.000 Mes 3: $7.000
        `when`(gastosService.getGastosForUserPerMonth(anyInt(), any(), any())).thenReturn(
            listOf(
                GastosMensualizados(LocalDate.now().minusMonths(2), buildGastos()),
                GastosMensualizados(LocalDate.now().minusMonths(1), buildGastos(2000, 3000, 40000)),
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
        // Ahorros = Mes 1: $21.000 Mes 2: -$10.000 Mes 3: $28.000
        // Promedio ahorro mes 4 y 5 = $39.000 / 3 -> $13.000
        // Cantidad de meses 2 -> 2 meses para atrás + mes actual + 2 meses siguientes
        val result = this.ahorrosService.getAhorrosConInversionAplicada(1, 2, "Plazo Fijo Galicia")
        assertEquals(5, result.size)
        assertEquals(21000, result[0].acumulado) // Mes pasado no se invierte
        assertEquals(11000, result[1].acumulado) // Mes pasado no se invierte
        assertEquals(39000, result[2].acumulado) // Este acumulado es invertido (mes actual)
        assertEquals(54730, result[3].acumulado) // $13.000 + $39.000 + 7% de $39.000 ($2.730)
        assertEquals(71561, result.last().acumulado) // $13.000 + $54.730 + 7% de $54.730 ($3.831)
    }

    @Test
    fun dadoTresMesesConIngresosYGastosCuandoSePidenLosAhorrosConInversionUvaYAmplitudDe3MesesSeAgreganTresMesesFuturosConLosAhorrosInvertidos() {
        `when`(inversionesService.getInversiones()).thenReturn(
            hashMapOf(
                "Plazos Fijos" to listOf(Inversion("Plazo Fijo Uva", 7f, Periodicidad.MENSUAL, 1, "PlazoFijo"))
            )
        )
        // Gastos = Mes 1: $5.000 Mes 2: $14.000 Mes 3: $9.000 Mes 4: $7.000
        `when`(gastosService.getGastosForUserPerMonth(anyInt(), any(), any())).thenReturn(
            listOf(
                GastosMensualizados(LocalDate.now().minusMonths(3), buildGastos(2000, 1000, 2000)),
                GastosMensualizados(LocalDate.now().minusMonths(2), buildGastos()),
                GastosMensualizados(LocalDate.now().minusMonths(1), buildGastos(2000, 3000, 4000)),
                GastosMensualizados(LocalDate.now(), buildGastos(1000, 1000, 5000))
            )
        )
        // Ingresos = Mes 1,2,3,4: $35.000
        `when`(ingresosService.getIngresosForUserPerMonth(anyInt(), any(), any())).thenReturn(
            listOf(
                IngresosMensualizados(LocalDate.now().minusMonths(3), buildIngresos()),
                IngresosMensualizados(LocalDate.now().minusMonths(2), buildIngresos()),
                IngresosMensualizados(LocalDate.now().minusMonths(1), buildIngresos()),
                IngresosMensualizados(LocalDate.now(), buildIngresos())
            )
        )
        // Ahorros = Mes 1: $30.000 Mes 2: $21.000 Mes 3: $26.000 Mes 4: $28.000
        // Promedio ahorro mes 5, 6 y 7 = $105.000 / 4 -> 26.250
        // Cantidad de meses 3 -> 3 meses para atrás + mes actual + 3 meses siguientes
        val result = this.ahorrosService.getAhorrosConInversionAplicada(1, 3, "Plazo Fijo Uva", false)
        assertEquals(7, result.size)
        assertEquals(30000, result[0].acumulado) // Este monto se invierte
        assertEquals(51000, result[1].acumulado) // $30.000 + $21.000 (30 días)
        assertEquals(77000, result[2].acumulado) // $51.000 + $26.000 (60 días)
        assertEquals(111300, result[3].acumulado) // $77.000 + $28.000 + $6.300 (21% $30.000) (90 días)
    }

    @Test
    fun dadoTresMesesConIngresosYGastosCuandoSePidenLosAhorrosConInversionUvaYAmplitudDe3MesesSeAgreganTresMesesFuturosConLosAhorrosFuturosInvertidos() {
        `when`(inversionesService.getInversiones()).thenReturn(
            hashMapOf(
                "Plazos Fijos" to listOf(Inversion("Plazo Fijo Uva", 7f, Periodicidad.MENSUAL, 1, "PlazoFijo"))
            )
        )
        // Gastos = Mes 1: $5.000 Mes 2: $14.000 Mes 3: $9.000 Mes 4: $7.000
        `when`(gastosService.getGastosForUserPerMonth(anyInt(), any(), any())).thenReturn(
            listOf(
                GastosMensualizados(LocalDate.now().minusMonths(3), buildGastos(2000, 1000, 2000)),
                GastosMensualizados(LocalDate.now().minusMonths(2), buildGastos()),
                GastosMensualizados(LocalDate.now().minusMonths(1), buildGastos(2000, 3000, 4000)),
                GastosMensualizados(LocalDate.now(), buildGastos(1000, 1000, 5000))
            )
        )
        // Ingresos = Mes 1,2,3,4: $35.000
        `when`(ingresosService.getIngresosForUserPerMonth(anyInt(), any(), any())).thenReturn(
            listOf(
                IngresosMensualizados(LocalDate.now().minusMonths(3), buildIngresos()),
                IngresosMensualizados(LocalDate.now().minusMonths(2), buildIngresos()),
                IngresosMensualizados(LocalDate.now().minusMonths(1), buildIngresos()),
                IngresosMensualizados(LocalDate.now(), buildIngresos())
            )
        )
        // Ahorros = Mes 1: $30.000 Mes 2: $21.000 Mes 3: $26.000 Mes 4: $28.000
        // Promedio ahorro mes 5, 6 y 7 = $105.000 / 4 -> 26.250
        // Cantidad de meses 3 -> 3 meses para atrás + mes actual + 3 meses siguientes
        val result = this.ahorrosService.getAhorrosConInversionAplicada(1, 3, "Plazo Fijo Uva")
        assertEquals(7, result.size)
        assertEquals(30000, result[0].acumulado) // Mes pasado no se invierte
        assertEquals(51000, result[1].acumulado) // Mes pasado no se invierte
        assertEquals(77000, result[2].acumulado) // Mes pasado no se invierte
        assertEquals(105000, result[3].acumulado) // Mes actual se invierte
        assertEquals(131250, result[4].acumulado) // $105.000 + $26.250 (30 días)
        assertEquals(157500, result[5].acumulado) // $131.250 + $26.250 (60 días)
        assertEquals(205800, result[6].acumulado) // $157.500 + $26.250 + $22.050 (21% $105.000) (90 días)
    }

    @Test
    fun dadoTresMesesConIngresosYGastosCuandoSePidenLosAhorrosConInversionUvaYAmplitudDe3MesesYUnMesEditadoSeAgreganTresMesesFuturosConLosAhorrosFuturosInvertidosEditados() {
        `when`(inversionesService.getInversiones()).thenReturn(
            hashMapOf(
                "Plazos Fijos" to listOf(Inversion("Plazo Fijo Uva", 7f, Periodicidad.MENSUAL, 1, "PlazoFijo"))
            )
        )
        // Gastos = Mes 1: $5.000 Mes 2: $14.000 Mes 3: $9.000 Mes 4: $7.000
        `when`(gastosService.getGastosForUserPerMonth(anyInt(), any(), any())).thenReturn(
            listOf(
                GastosMensualizados(LocalDate.now().minusMonths(3), buildGastos(2000, 1000, 2000)),
                GastosMensualizados(LocalDate.now().minusMonths(2), buildGastos()),
                GastosMensualizados(LocalDate.now().minusMonths(1), buildGastos(2000, 3000, 4000)),
                GastosMensualizados(LocalDate.now(), buildGastos(1000, 1000, 5000))
            )
        )
        // Ingresos = Mes 1,2,3,4: $35.000
        `when`(ingresosService.getIngresosForUserPerMonth(anyInt(), any(), any())).thenReturn(
            listOf(
                IngresosMensualizados(LocalDate.now().minusMonths(3), buildIngresos()),
                IngresosMensualizados(LocalDate.now().minusMonths(2), buildIngresos()),
                IngresosMensualizados(LocalDate.now().minusMonths(1), buildIngresos()),
                IngresosMensualizados(LocalDate.now(), buildIngresos())
            )
        )

        val ediciones = Ediciones(hashMapOf(LocalDate.now().plusMonths(1).withDayOfMonth(1) to 10000))
        // Ahorros = Mes 1: $30.000 Mes 2: $21.000 Mes 3: $26.000 Mes 4: $28.000
        // Promedio ahorro mes 5, 6 y 7 = $105.000 / 4 -> 26.250
        // Cantidad de meses 3 -> 3 meses para atrás + mes actual + 3 meses siguientes
        val result = this.ahorrosService.getAhorrosConInversionAplicada(1, 3, "Plazo Fijo Uva", true, ediciones)
        assertEquals(7, result.size)
        assertEquals(30000, result[0].acumulado) // Mes pasado no se invierte
        assertEquals(51000, result[1].acumulado) // Mes pasado no se invierte
        assertEquals(77000, result[2].acumulado) // Mes pasado no se invierte
        assertEquals(105000, result[3].acumulado) // Mes actual se invierte
        assertEquals(141250, result[4].acumulado) // $105.000 + $26.250 (30 días) + $10.000 (agregado)
        assertEquals(167500, result[5].acumulado) // $131.250 + $26.250 (60 días)
        assertEquals(215800, result[6].acumulado) // $157.500 + $26.250 + $22.050 (21% $105.000) (90 días)
    }

    @Test
    fun dadoDosMesesConIngresosYGastosCuandoSePidenLosAhorrosConPlazoFijoYAmplitudDe2MesesYUnMesEditadoSeAgreganDosMesesFuturosConLosAhorrosFuturosInvertidosEditados() {
        `when`(inversionesService.getInversiones()).thenReturn(
            hashMapOf(
                "Plazos Fijos" to listOf(Inversion("Plazo Fijo Galicia", 7f, Periodicidad.MENSUAL, 1, "PlazoFijo"))
            )
        )
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
        val ediciones = Ediciones(hashMapOf(LocalDate.now().plusMonths(1).withDayOfMonth(1) to 10000))
        // Ahorros = Mes 1: $21.000 Mes 2: $26.000 Mes 3: $28.000
        // Promedio ahorro mes 4 = $75.000 / 3 -> 25.000
        // Cantidad de meses 2 -> 2 meses para atrás + mes actual + 2 meses siguientes
        val result = this.ahorrosService.getAhorrosConInversionAplicada(1, 2, "Plazo Fijo Galicia", true, ediciones)
        assertEquals(5, result.size)
        assertEquals(21000, result[0].acumulado) // Mes pasado no se invierte
        assertEquals(47000, result[1].acumulado) // Mes pasado no se invierte
        assertEquals(75000, result[2].acumulado) // Este acumulado es invertido (mes actual)
        assertEquals(115250, result[3].acumulado) // $25.000 + $75.000 + 7% de $75.000 (5.250) + $10.000 (editado)
        assertEquals(148317, result.last().acumulado) // $25.000 + $115.250 + 7% de $105.250 ($8.067)
    }

    @Test
    fun dadoDosMesesConIngresosYGastosCuandoSePidenLosAhorrosConPlazoFijoYAmplitudDe2MesesYUnMesEditadoSeAgreganDosMesesFuturosConLosAhorrosFuturosInvertidosEditadosRestados() {
        `when`(inversionesService.getInversiones()).thenReturn(
            hashMapOf(
                "Plazos Fijos" to listOf(Inversion("Plazo Fijo Galicia", 7f, Periodicidad.MENSUAL, 1, "PlazoFijo"))
            )
        )
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
        val ediciones = Ediciones(hashMapOf(LocalDate.now().plusMonths(1).withDayOfMonth(1) to -10000))
        // Ahorros = Mes 1: $21.000 Mes 2: $26.000 Mes 3: $28.000
        // Promedio ahorro mes 4 = $75.000 / 3 -> 25.000
        // Cantidad de meses 2 -> 2 meses para atrás + mes actual + 2 meses siguientes
        val result = this.ahorrosService.getAhorrosConInversionAplicada(1, 2, "Plazo Fijo Galicia", true, ediciones)
        assertEquals(5, result.size)
        assertEquals(21000, result[0].acumulado) // Mes pasado no se invierte
        assertEquals(47000, result[1].acumulado) // Mes pasado no se invierte
        assertEquals(75000, result[2].acumulado) // Este acumulado es invertido (mes actual)
        assertEquals(95250, result[3].acumulado) // $25.000 + $75.000 + 7% de $75.000 (5.250) + $10.000 (editado)
        assertEquals(126917, result.last().acumulado) // $25.000 + $95.250 + 7% de $95.250 ($6.667)
    }

    @Test
    fun dadoUnaListaDeInversionesCuandoSePideUnNombreInexistenteSeLanzaLaExceptionInvestmentNotFound() {
        `when`(inversionesService.getInversiones()).thenReturn(
            hashMapOf(
                "Plazos Fijos" to listOf(Inversion("Plazo Fijo Galicia", 7f, Periodicidad.MENSUAL, 1, "PlazoFijo"))
            )
        )
        assertThrows<InvestmentNotFoundException> { this.ahorrosService.getAhorrosConInversionAplicada(1, 2, "Banco Pepe") }
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