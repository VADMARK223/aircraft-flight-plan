package vadmark.afp.dto

import lombok.Data
import vadmark.afp.entity.RouteView

@Data
class FlightDto {
    var id: Int? = null
    var routes: List<RouteView> = listOf<RouteView>()
}
