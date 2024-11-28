package vadmark.afp.web

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import vadmark.afp.dto.FlightDto

@RestController
@RequestMapping("\${api.prefix}/flight")
class FlightController {
    @GetMapping("/get_all_flights")
    fun getAll(): FlightDto {
        val dto: FlightDto = FlightDto()
        dto.id = 999
        return dto
    }
}
