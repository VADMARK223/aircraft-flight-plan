package vadmark.afp.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import vadmark.afp.entity.RouteView

@Repository
interface RouteRepository : JpaRepository<RouteView, Int>
