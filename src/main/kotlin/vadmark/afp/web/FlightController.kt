package vadmark.afp.web

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import vadmark.afp.dto.FlightDto
import vadmark.afp.dto.RouteDto
import vadmark.afp.entity.Flight
import vadmark.afp.service.FlightService

@RestController
@RequestMapping("\${api.prefix}/flight")
class FlightController(private val service: FlightService) {
    @GetMapping("/add")
    fun add(): FlightDto {
        val dto: FlightDto = FlightDto()
        dto.id = 999
        dto.name = "Test name"
        dto.type = 1
        dto.routes = arrayOf<RouteDto>()
        return dto
    }

    @GetMapping("/get_all_flights")
    fun getAll(): List<Flight> {
        return service.findAll()
    }
}
