package vadmark.afp.mapper

import org.mapstruct.Context
import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.mapstruct.ReportingPolicy
import vadmark.afp.dto.FlightDto
import vadmark.afp.entity.Flight
import vadmark.afp.service.RouteService

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
interface FlightMapper {
    @Mapping(source = "flightId", target = "id")
    @Mapping(source = "contract.contractId", target = "contractId")
    @Mapping(expression = "java(routeService.findAllByFlightId(flight.getFlightId()))", target = "routes")
    fun toDto(flight: Flight, @Context routeService: RouteService): FlightDto

    fun toDtoList(flights: List<Flight>, @Context routeService: RouteService):List<FlightDto>
}
