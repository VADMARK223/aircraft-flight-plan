package vadmark.aircraftflightplan

import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest
import vadmark.afp.AircraftFlightPlanApp

@SpringBootTest(classes = arrayOf(AircraftFlightPlanApp::class))
class AircraftFlightPlanApplicationTests {

    @Test
    fun contextLoads() {
        println("HELLO WORLD")
    }

}
