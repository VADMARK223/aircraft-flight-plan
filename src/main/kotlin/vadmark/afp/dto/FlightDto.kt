package vadmark.afp.dto

import vadmark.afp.entity.Contract
import vadmark.afp.entity.RouteView

data class FlightDto(
    var id: Int? = null,
    var routes: List<RouteView> = listOf<RouteView>(),
    var contract: Contract? = null
)
