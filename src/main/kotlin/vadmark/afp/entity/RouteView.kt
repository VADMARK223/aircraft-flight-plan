package vadmark.afp.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.time.LocalDateTime

/**
 * @author Markitanov Vadim
 * @since 11.11.2024
 */
@Entity
@Table(schema = "afp_schema", name = "v_route")
class RouteView {
    @Id
    @Column(name = "route_id")
    var id: Int = 0

    @Column(name = "aircraft_id")
    var aircraftId: Int = 0

    // Идентификатор рейса
    @Column(name = "flight_id")
    var flightId: Int = 0

    // Плановая дата вылета
    @Column(name = "scheduled_departure_date")
    var scheduledDepartureDate: LocalDateTime? = null

    // Плановая дата прилета
    @Column(name = "scheduled_arrival_date")
    var scheduledArrivalDate: LocalDateTime? = null

    // Тип перелета
    @Column(name = "route_type_id")
    var routeTypeId: Int = 0
}