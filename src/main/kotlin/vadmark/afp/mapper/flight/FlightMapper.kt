package vadmark.afp.mapper.flight

import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.mapstruct.ReportingPolicy
import vadmark.afp.dto.FlightDto
import vadmark.afp.entity.Flight

@Mapper(componentModel = "spring", uses = [FlightMapperHelper::class], unmappedTargetPolicy = ReportingPolicy.IGNORE)
interface FlightMapper {
    @Mapping(source = "flightId", target = "id")
    @Mapping(source = "contract", target = "contract"/*, qualifiedByName = ["mapContract"]*/)
    @Mapping(ignore = true, target = "routes")
    fun toDto(flight: Flight): FlightDto

//    companion object {
//        @JvmStatic
//        @Named("mapContract")
//        fun mapContract(contract: Contract): DictDto {
//            println(">>>> $contract")
//            return DictDto(value = contract.contractId, label = contract.name)
//        }
//    }

    fun toDtoList(flights: List<Flight>): List<FlightDto>
}
