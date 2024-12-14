package vadmark.afp.web

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import vadmark.afp.dto.FlightDto
import vadmark.afp.dto.ResponseDto
import vadmark.afp.entity.Route
import vadmark.afp.entity.RouteView
import vadmark.afp.mapper.flight.FlightMapper
import vadmark.afp.service.FlightService
import vadmark.afp.service.RouteService
import vadmark.afp.util.Response

@RestController
@RequestMapping("\${api.prefix}/route")
class RouteController(
    private val routeService: RouteService,
    private val flightService: FlightService,
    private val flightMapper: FlightMapper
) {
    @GetMapping("/get_all")
    fun getAll(): List<RouteView> {
        return routeService.findAll()
    }

    @PostMapping("/add_or_save_route")
    fun addOrSave(@RequestBody route: Route): ResponseEntity<ResponseDto<List<FlightDto>>> {
        if (route.flightId == null) {
            return ResponseEntity.ok(Response.failure("У перелета '${route.id}' нету идентификатора рейса."))
        }

        routeService.addOrSave(route)

        val flights = flightService.findAll()
        return ResponseEntity.ok(Response.success(flightMapper.toDtoList(flights)))
    }

    @PostMapping("/delete_route")
    fun delete(@RequestBody routeId: Int): ResponseEntity<ResponseDto<List<FlightDto>>> {
        routeService.delete(routeId)
        val flights = flightService.findAll()
        return ResponseEntity.ok(Response.success(flightMapper.toDtoList(flights)))
    }
}
