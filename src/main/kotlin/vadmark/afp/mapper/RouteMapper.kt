package vadmark.afp.mapper

import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.mapstruct.ReportingPolicy
import vadmark.afp.entity.Contract
import vadmark.afp.model.dto.DictDto

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
interface RouteMapper {
    /*@Mapping(source = "contractId", target = "value")
    @Mapping(expression = "java(\"Контракт \" + contract.getContractId())", target = "label")
    fun toDto(contract: Route): DictDto*/
}
