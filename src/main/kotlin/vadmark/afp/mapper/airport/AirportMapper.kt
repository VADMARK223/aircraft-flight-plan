package vadmark.afp.mapper.airport

import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.mapstruct.Named
import vadmark.afp.entity.Airport
import vadmark.afp.model.dto.DictDto

@Deprecated(message = "Not used anymore")
@Mapper(componentModel = "spring")
interface AirportMapper {
    @Mapping(source = "airportId", target = "value")
    @Mapping(source = "airportName", qualifiedByName = ["createLabel"], target = "label")
    fun toDto(entity: Airport): DictDto

    companion object {
        @JvmStatic
        @Named("createLabel")
        fun createLabel(airportName: String): String {
            return airportName
        }
    }

    fun toDoList(entities: List<Airport>): List<DictDto>
}
