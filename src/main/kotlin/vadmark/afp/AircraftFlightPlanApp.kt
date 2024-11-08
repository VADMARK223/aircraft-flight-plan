package vadmark.afp

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class AircraftFlightPlanApp

fun main(args: Array<String>) {
    runApplication<AircraftFlightPlanApp>(*args)
}
