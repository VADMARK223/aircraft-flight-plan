package vadmark.afp.web

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import vadmark.afp.dto.ResponseDto
import vadmark.afp.entity.Airport
import vadmark.afp.repository.AirportRepository
import vadmark.afp.util.Response

@RestController
@RequestMapping("\${api.prefix}/airport")
class AirportController(
    private val airportRepo: AirportRepository,
) {
    @GetMapping("/get_airports")
    fun airport(): ResponseEntity<ResponseDto<List<Airport>>> {
        return ResponseEntity.ok(Response.success(airportRepo.findAll()))
    }
}
