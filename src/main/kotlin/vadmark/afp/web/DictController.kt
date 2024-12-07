package vadmark.afp.web

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import vadmark.afp.dto.ResponseDto
import vadmark.afp.mapper.airport.AirportMapper
import vadmark.afp.mapper.ContractMapper
import vadmark.afp.mapper.dict.AircraftTypeMapper
import vadmark.afp.mapper.dict.RouteTypeMapper
import vadmark.afp.model.dto.DictDto
import vadmark.afp.repository.AirportRepository
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
    private val airportRepo: AirportRepository,
    private val routeTypeMapper: RouteTypeMapper,
    private val aircraftTypeMapper: AircraftTypeMapper,
    private val contractMapper: ContractMapper,
    private val airportMapper: AirportMapper
) {
    @GetMapping("/dict_aircraft_type")
    fun aircraftType(): ResponseEntity<ResponseDto<List<DictDto>>> =
        ResponseEntity.ok(Response.success(aircraftTypeMapper.toDoList(dictAircraftTypeRepo.findAll())))

    @GetMapping("/dict_route_type")
    fun routeType(): ResponseEntity<ResponseDto<List<DictDto>>> =
        ResponseEntity.ok(Response.success(routeTypeMapper.toDoList(dictRouteTypeRepo.findAll())))


    @GetMapping("/dict_contract")
    fun contract(): ResponseEntity<ResponseDto<List<DictDto>>> =
        ResponseEntity.ok(Response.success(contractMapper.toDoList(contractRepo.findAll())))

    @GetMapping("/dict_airport")
    fun airport(): ResponseEntity<ResponseDto<List<DictDto>>> {
        return ResponseEntity.ok(Response.success(airportMapper.toDoList(airportRepo.findAll())))
    }

}
