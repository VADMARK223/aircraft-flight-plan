package vadmark.afp.web

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import vadmark.afp.dto.ResponseDto
import vadmark.afp.mapper.dict.AircraftTypeMapper
import vadmark.afp.mapper.dict.RouteTypeMapper
import vadmark.afp.model.dto.DictDto
import vadmark.afp.repository.DictAircraftTypeRepository
import vadmark.afp.repository.DictRouteTypeRepository
import vadmark.afp.util.Response

@RestController
@RequestMapping("\${api.prefix}/dict")
class DictController(
    private val dictAircraftTypeRepo: DictAircraftTypeRepository,
    private val dictRouteTypeRepo: DictRouteTypeRepository,
    private val routeTypeMapper: RouteTypeMapper,
    private val aircraftTypeMapper: AircraftTypeMapper
) {
    @GetMapping("/dict_aircraft_type")
    fun aircraftType(): ResponseEntity<ResponseDto<List<DictDto>>> =
        ResponseEntity.ok(Response.success(aircraftTypeMapper.toDoList(dictAircraftTypeRepo.findAll())))

    @GetMapping("/dict_route_type")
    fun routeType(): ResponseEntity<ResponseDto<List<DictDto>>> =
        ResponseEntity.ok(Response.success(routeTypeMapper.toDoList(dictRouteTypeRepo.findAll())))
}
