package vadmark.afp.web

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import vadmark.afp.dto.FlightDto
import vadmark.afp.dto.ResponseDto
import vadmark.afp.entity.Flight
import vadmark.afp.mapper.flight.FlightMapper
import vadmark.afp.service.ContractService
import vadmark.afp.service.FlightService
import vadmark.afp.util.Response

@RestController
@RequestMapping("\${api.prefix}/flight")
class FlightController(
    private val flightService: FlightService,
    private val contractService: ContractService,
    private val flightMapper: FlightMapper
) {
    @GetMapping("/get_all_flights")
    fun getAll(): ResponseEntity<ResponseDto<List<FlightDto>>> {
        val flights = flightService.findAll()
        return ResponseEntity.ok(Response.success(flightMapper.toDtoList(flights)))
    }

    @PostMapping("/add_flight")
    fun add(@RequestBody contractId: Int): ResponseEntity<ResponseDto<FlightDto>> {
        return ResponseEntity.ok(Response.success(flightMapper.toDto(flightService.add(contractId))))
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
