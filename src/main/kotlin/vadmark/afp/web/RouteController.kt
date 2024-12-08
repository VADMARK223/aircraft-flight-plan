package vadmark.afp.web

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import vadmark.afp.dto.ResponseDto
import vadmark.afp.entity.Route
import vadmark.afp.entity.RouteView
import vadmark.afp.service.RouteService
import vadmark.afp.util.Response

@RestController
@RequestMapping("\${api.prefix}/route")
class RouteController(private val routeService: RouteService) {
    @GetMapping("/get_all")
    fun getAll(): List<RouteView> {
        return routeService.findAll()
    }

    @PostMapping("/add_or_save_route")
    fun addOrSave(@RequestBody route: Route): ResponseEntity<ResponseDto<Route>> {
//        return ResponseEntity.ok(Response.success(routeService.add(route)))
        if (route.routeId == -1) {
            println("Add route: $route")
            route.routeId = null

        } else {
            println("Add save: $route")
        }

        routeService.addOrSave(route)

        return ResponseEntity.ok(Response.success(route))
    }
}
