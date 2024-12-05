package vadmark.afp.mapper.flight

import org.mapstruct.AfterMapping
import org.mapstruct.MappingTarget
import org.springframework.stereotype.Component
import vadmark.afp.dto.FlightDto
import vadmark.afp.entity.Flight
import vadmark.afp.service.RouteService

@Component
class FlightMapperHelper(private val routeService: RouteService) {
    @AfterMapping
    fun mapRoutes(flight: Flight, @MappingTarget dto: FlightDto) {
        dto.routes = routeService.findAllByFlightId(flight.flightId)
    }
}
