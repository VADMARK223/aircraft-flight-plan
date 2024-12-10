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
    fun addOrSave(@RequestBody route: Route): ResponseEntity<ResponseDto<RouteView>> {
        println("addOrSave $route")
        if (route.flightId == null) {
            return ResponseEntity.ok(Response.failure("У перелета '${route.id}' нету идентификатора рейса."))
        }

        if (route.id == -1) {
            route.id = null
        }

        val result = routeService.addOrSave(route)
        println("Result: $result")

        val viewOptional = routeService.findById(result.id!!)
        if (!viewOptional.isPresent) {
            return ResponseEntity.ok(Response.failure("Представление перелетов ${result.id} не найдено."))
        }
        println("View: ${viewOptional.get()}")

        return ResponseEntity.ok(Response.success(viewOptional.get()))
    }
}
