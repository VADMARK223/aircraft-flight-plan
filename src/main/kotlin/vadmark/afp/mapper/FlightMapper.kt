package vadmark.afp.mapper

import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.mapstruct.ReportingPolicy
import vadmark.afp.dto.FlightDto
import vadmark.afp.entity.Flight

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
interface FlightMapper {
    @Mapping(source = "flightId", target = "id")
    @Mapping(source = "contract.contractId", target = "contractId")
    fun toDto(user: Flight): FlightDto
}
