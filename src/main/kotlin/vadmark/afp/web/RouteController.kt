package vadmark.afp.web

import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import vadmark.afp.service.UserService
import vadmark.afp.entity.Route
import vadmark.afp.service.RouteService

@RestController
@CrossOrigin("*")
@RequestMapping("/route")
class RouteController(private val routeService: RouteService, private val userService: UserService) {
    @GetMapping("/get_all")
    fun getAll(): List<Route> {
        return routeService.findAll()
    }

    @GetMapping("/info")
    fun getInfo(): String {
        return userService.getInfo()
    }
}
