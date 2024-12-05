package vadmark.afp.web

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import vadmark.afp.dto.ResponseDto
import vadmark.afp.mapper.dict.AircraftTypeMapper
import vadmark.afp.mapper.dict.RouteTypeMapper
import vadmark.afp.model.dto.DictDto
import vadmark.afp.repository.ContractRepository
import vadmark.afp.repository.DictAircraftTypeRepository
import vadmark.afp.repository.DictRouteTypeRepository
import vadmark.afp.util.Response

@RestController
@RequestMapping("\${api.prefix}/dict")
class DictController(
    private val dictAircraftTypeRepo: DictAircraftTypeRepository,
    private val dictRouteTypeRepo: DictRouteTypeRepository,
    private val contractRepo: ContractRepository,
    private val routeTypeMapper: RouteTypeMapper,
    private val aircraftTypeMapper: AircraftTypeMapper
) {
    @GetMapping("/dict_aircraft_type")
    fun aircraftType(): ResponseEntity<ResponseDto<List<DictDto>>> {
        return ResponseEntity.ok(Response.success(aircraftTypeMapper.toDoList(dictAircraftTypeRepo.findAll())))
    }

    @GetMapping("/dict_route_type")
    fun routeType(): ResponseEntity<ResponseDto<List<DictDto>>> {
        return ResponseEntity.ok(Response.success(routeTypeMapper.toDoList(dictRouteTypeRepo.findAll())))
    }

    @GetMapping("/dict_contract")
    fun contract(): ResponseEntity<ResponseDto<List<DictDto>>> {
        val contracts = contractRepo.findAll()
        var result = mutableListOf<DictDto>()
        contracts.forEach { it ->
            val dto = DictDto()
            dto.value = it.contractId
            dto.label = "Контракт ${it.contractId}"
            result.add(dto)
        }
        return ResponseEntity.ok(Response.success(result))
    }
}
