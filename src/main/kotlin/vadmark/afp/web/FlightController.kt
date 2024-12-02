package vadmark.afp.web

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import vadmark.afp.dto.FlightDto
import vadmark.afp.dto.ResponseDto
import vadmark.afp.dto.RouteDto
import vadmark.afp.entity.Flight
import vadmark.afp.service.FlightService
import vadmark.afp.util.Response

@RestController
@RequestMapping("\${api.prefix}/flight")
class FlightController(private val service: FlightService) {

    @PostMapping("/add")
    fun add(@RequestBody contactId: Int): ResponseEntity<ResponseDto<FlightDto>> {
        val dto: FlightDto = FlightDto()
        val flight = service.add(contactId)
        dto.id = flight.flightId
        dto.routes = arrayOf<RouteDto>()
        return ResponseEntity.ok(Response.success(dto))
    }


    /*@GetMapping("/add")
    fun add(): ResponseEntity<ResponseDto<FlightDto>> {
        val dto: FlightDto = FlightDto()
        dto.id = 999
        dto.name = "Test name"
        dto.type = 1
        dto.routes = arrayOf<RouteDto>()
        service.add(contactId)

        return ResponseEntity.ok(Response.success(dto))
    }*/

    @GetMapping("/get_all_flights")
    fun getAll(): List<Flight> {
        return service.findAll()
    }
}
