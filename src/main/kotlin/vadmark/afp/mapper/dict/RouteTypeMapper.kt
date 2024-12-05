package vadmark.afp.mapper.dict

import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.mapstruct.ReportingPolicy
import vadmark.afp.entity.DictRouteType
import vadmark.afp.model.dto.DictDto

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
interface RouteTypeMapper {
    @Mapping(source = "routeTypeId", target = "value")
    @Mapping(source = "name", target = "label")
    fun toDto(entity: DictRouteType): DictDto

    fun toDoList(entities: List<DictRouteType>): List<DictDto>
}
