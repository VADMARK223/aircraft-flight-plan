package vadmark.afp.mapper

import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.mapstruct.ReportingPolicy
import vadmark.afp.entity.Contract
import vadmark.afp.model.dto.DictDto

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
interface ContractMapper {
    @Mapping(source = "contractId", target = "value")
    @Mapping(expression = "java(\"Контракт \" + contract.getContractId())", target = "label")
    fun toDto(contract: Contract): DictDto

    fun toDoList(entities: List<Contract>): List<DictDto>
}
