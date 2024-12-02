package vadmark.afp.dto

import lombok.Data

@Data
class FlightDto {
    var id: Int? = null
    var name: String? = null
    var routes: Array<RouteDto> = arrayOf<RouteDto>()
}
