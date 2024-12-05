package vadmark.afp.mapper.flight

import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.mapstruct.ReportingPolicy
import vadmark.afp.dto.FlightDto
import vadmark.afp.entity.Flight

@Mapper(componentModel = "spring", uses = [FlightMapperHelper::class], unmappedTargetPolicy = ReportingPolicy.IGNORE)
interface FlightMapper {
    @Mapping(source = "flightId", target = "id")
    @Mapping(source = "contract.contractId", target = "contractId")
    @Mapping(ignore = true, target = "routes")
    fun toDto(flight: Flight): FlightDto

    fun toDtoList(flights: List<Flight>): List<FlightDto>
}
