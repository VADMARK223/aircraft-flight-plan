package vadmark.afp.web

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

import vadmark.afp.entity.RouteView
import vadmark.afp.service.RouteService

@RestController
@RequestMapping("\${api.prefix}/route")
class RouteController(private val routeService: RouteService) {
    @GetMapping("/get_all")
    fun getAll(): List<RouteView> {
        return routeService.findAll()
    }
}
