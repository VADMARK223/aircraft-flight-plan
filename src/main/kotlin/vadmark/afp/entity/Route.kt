package vadmark.afp.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.SequenceGenerator
import jakarta.persistence.Table
import java.time.ZonedDateTime

@Entity
@Table(name = "route")
class Route {
    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "route_sequence_generator")
    @SequenceGenerator(name = "route_sequence_generator", sequenceName = "route_id_seq", allocationSize = 1)
    @Column(name = "id")
    var id: Int? = null

    @Column(name="airport_departure")
    var airportDepartureId: Int? = null

    @Column(name="airport_arrival")
    var airportArrivalId: Int? = null

    @Column(name="scheduled_departure_date")
    var scheduledDepartureDate: ZonedDateTime? = null

    @Column(name="scheduled_arrival_date")
    var scheduledArrivalDate: ZonedDateTime? = null

    @Column(name="route_type_id")
    var routeTypeId: Int? = null

    @Column(name="flight_id")
    var flightId: Int? = null

    override fun toString(): String {
        return "Route(id=$id, flightId=$flightId, routeTypeId=$routeTypeId)"
    }
}


