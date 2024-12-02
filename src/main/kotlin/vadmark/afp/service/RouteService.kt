package vadmark.afp.service

import org.springframework.stereotype.Service
import vadmark.afp.entity.RouteView
import vadmark.afp.repository.RouteRepository

@Service
class RouteService(private val repo: RouteRepository) {
    fun findAll(): List<RouteView> = repo.findAll()
    fun findAllByFlightId(flightId:Int):List<RouteView> = repo.findRouteViewByFlightId(flightId)
}
