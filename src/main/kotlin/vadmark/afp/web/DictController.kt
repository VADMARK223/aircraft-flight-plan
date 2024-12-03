package vadmark.afp.web

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import vadmark.afp.dto.ResponseDto
import vadmark.afp.entity.DictAircraftType
import vadmark.afp.entity.DictRouteType
import vadmark.afp.repository.DictAircraftTypeRepository
import vadmark.afp.repository.DictRouteTypeRepository
import vadmark.afp.util.Response

@RestController
@RequestMapping("\${api.prefix}/dict")
class DictController(
    private val dictAircraftTypeRepo: DictAircraftTypeRepository,
    private val dictRouteTypeRepo: DictRouteTypeRepository
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
}
