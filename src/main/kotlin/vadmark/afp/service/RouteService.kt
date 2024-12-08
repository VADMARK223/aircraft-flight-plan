package vadmark.afp.service

import org.springframework.stereotype.Service
import vadmark.afp.entity.Route
import vadmark.afp.entity.RouteView
import vadmark.afp.repository.RouteRepository
import vadmark.afp.repository.RouteViewRepository

@Service
class RouteService(
    private val viewRepo: RouteViewRepository,
    private val repo: RouteRepository
) {
    fun findAll(): List<RouteView> = viewRepo.findAll()
    fun findAllByFlightId(flightId: Int): List<RouteView> = viewRepo.findRouteViewByFlightId(flightId)
    fun addOrSave(route: Route): Route = repo.save(route)
}
