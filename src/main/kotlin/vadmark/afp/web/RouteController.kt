package vadmark.afp.web

import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import vadmark.afp.dto.RouteDto

@RestController
@CrossOrigin("*")
@RequestMapping("/route")
class RouteController {
    @GetMapping("/get_all")
    fun getAll(): Array<RouteDto> {
        val dto1 = RouteDto()
        dto1.name = "Board1"

        val dto2 = RouteDto()
        dto2.name = "Board1"

        return arrayOf(dto1, dto2)
    }
}
