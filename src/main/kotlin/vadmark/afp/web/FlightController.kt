package vadmark.afp.web

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import vadmark.afp.dto.FlightDto
import vadmark.afp.dto.ResponseDto
import vadmark.afp.entity.Flight
import vadmark.afp.entity.RouteView
import vadmark.afp.service.ContractService
import vadmark.afp.service.FlightService
import vadmark.afp.service.RouteService
import vadmark.afp.temp.User
import vadmark.afp.temp.UserMapper
import vadmark.afp.util.Response

@RestController
@RequestMapping("\${api.prefix}/flight")
class FlightController(
    private val flightService: FlightService,
    private val routeService: RouteService,
    private val contractService: ContractService,
    private val mapper: UserMapper
) {
    @GetMapping("/get_all_flights")
    fun getAll(): ResponseEntity<ResponseDto<List<FlightDto>>> {
        println("Get all flights")
        val user = User(id="1")
        val dot = mapper.toDto(user)
        println(dot)

        var result = mutableListOf<FlightDto>()
        val flights = flightService.findAll()
        flights.forEach { flight ->
            val dto = FlightDto()
            dto.id = flight.flightId
            dto.routes = routeService.findAllByFlightId(flight.flightId)
            dto.contractId = flight.contract?.contractId
            result.add(dto)
        }

        return ResponseEntity.ok(Response.success(result))
    }

    @PostMapping("/add_flight")
    fun add(@RequestBody contactId: Int): ResponseEntity<ResponseDto<FlightDto>> {
        val dto: FlightDto = FlightDto()
        val flight = flightService.add(contactId)
        dto.id = flight.flightId
        dto.routes = listOf<RouteView>()
        return ResponseEntity.ok(Response.success(dto))
    }

    @PostMapping("/delete_flight")
    fun delete(@RequestBody flightId: Int): ResponseEntity<ResponseDto<Int>> {
        flightService.delete(flightId)
        return ResponseEntity.ok(Response.success(flightId))
    }

    @PostMapping("/save_flight")
    fun save(@RequestBody flightDto: FlightDto): ResponseEntity<ResponseDto<FlightDto>> {
        val (id, _, contractId) = flightDto
        val flight = Flight()
        flight.flightId = flightDto.id!!

        val contract = contractService.findById(contractId!!)
        if (!contract.isPresent) {
            return ResponseEntity.ok(Response.failure("У рейса $id. Контракт $contractId не найден."))
        }
        flight.contract = contract.get()
        flightService.save(flight)
        return ResponseEntity.ok(Response.success(flightDto))
    }

    @PostMapping("/delete_all_flights")
    fun deleteAll(): ResponseEntity<ResponseDto<Boolean>> {
        flightService.deleteAll()
        return ResponseEntity.ok(Response.success(true))
    }
}
