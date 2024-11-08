package vadmark.afp.service

import org.springframework.stereotype.Service
import vadmark.afp.entity.Route
import vadmark.afp.repository.RouteRepository

@Service
class RouteService(private val repo: RouteRepository) {
    fun findAll(): List<Route> = repo.findAll()
}
