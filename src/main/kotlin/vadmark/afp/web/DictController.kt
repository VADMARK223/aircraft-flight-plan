package vadmark.afp.web

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import vadmark.afp.dto.ResponseDto
import vadmark.afp.entity.DictAircraftType
import vadmark.afp.entity.DictRouteType
import vadmark.afp.model.DictData
import vadmark.afp.repository.ContractRepository
import vadmark.afp.repository.DictAircraftTypeRepository
import vadmark.afp.repository.DictRouteTypeRepository
import vadmark.afp.util.Response

@RestController
@RequestMapping("\${api.prefix}/dict")
class DictController(
    private val dictAircraftTypeRepo: DictAircraftTypeRepository,
    private val dictRouteTypeRepo: DictRouteTypeRepository,
    private val contractRepo: ContractRepository
) {
    @GetMapping("/dict_aircraft_type")
    fun aircraftType(): ResponseEntity<ResponseDto<List<DictAircraftType>>> {
        val result = dictAircraftTypeRepo.findAll()
        return ResponseEntity.ok(Response.success(result))
    }

    @GetMapping("/dict_route_type")
    fun routeType(): ResponseEntity<ResponseDto<List<DictRouteType>>> {
        val result = dictRouteTypeRepo.findAll()
        return ResponseEntity.ok(Response.success(result))
    }

    @GetMapping("/dict_contract")
    fun contract(): ResponseEntity<ResponseDto<List<DictData>>> {
        val contracts = contractRepo.findAll()
        var result = mutableListOf<DictData>()
        contracts.forEach { it ->
            val dictData = DictData()
            dictData.value = it.contractId
            dictData.label = "Контракт ${it.contractId}"
            result.add(dictData)
        }
        return ResponseEntity.ok(Response.success(result))
    }
}
