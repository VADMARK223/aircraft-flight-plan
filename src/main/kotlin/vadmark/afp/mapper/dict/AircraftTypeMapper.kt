package vadmark.afp.mapper.dict

import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.mapstruct.ReportingPolicy
import vadmark.afp.entity.DictAircraftType
import vadmark.afp.model.dto.DictDto

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
interface AircraftTypeMapper {
    @Mapping(source = "aircraftTypeId", target = "value")
    @Mapping(source = "aircraftTypeName", target = "label")
    fun toDto(entity: DictAircraftType): DictDto

    fun toDoList(entities: List<DictAircraftType>): List<DictDto>
}
