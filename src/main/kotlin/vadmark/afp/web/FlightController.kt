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
import vadmark.afp.service.FlightService
import vadmark.afp.util.Response

@RestController
@RequestMapping("\${api.prefix}/flight")
class FlightController(private val service: FlightService) {
    @GetMapping("/get_all_flights")
    fun getAll(): ResponseEntity<ResponseDto<List<FlightDto>>> {
        var result = mutableListOf<FlightDto>()
        val flights = service.findAll()
        flights.forEach { flight ->
            val dto = FlightDto()
            dto.id = flight.flightId
            dto.routes = arrayOf<RouteDto>()
            result.add(dto)
        }

        return ResponseEntity.ok(Response.success(result))
    }

    @PostMapping("/add")
    fun add(@RequestBody contactId: Int): ResponseEntity<ResponseDto<FlightDto>> {
        val dto: FlightDto = FlightDto()
        val flight = service.add(contactId)
        dto.id = flight.flightId
        dto.routes = arrayOf<RouteDto>()
        return ResponseEntity.ok(Response.success(dto))
    }

    @PostMapping("/delete_all_flights")
    fun deleteAll(): ResponseEntity<ResponseDto<Boolean>> {
        service.deleteAll()
        return ResponseEntity.ok(Response.success(true))
    }
}
