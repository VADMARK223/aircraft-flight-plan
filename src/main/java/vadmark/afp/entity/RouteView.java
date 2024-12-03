package vadmark.afp.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * @author Markitanov Vadim
 * @since 11.11.2024
 */
@Entity
@Table(schema = "afp_schema", name = "v_route")
@Getter
@Setter
public class RouteView {
    @Id
    @Column(name = "route_id")
    private int id;

    @Column(name = "aircraft_id")
    private int aircraftId;

    // Идентификатор рейса
    @Column(name = "flight_id")
    private int flightId;

    // Плановая дата вылета
    @Column(name = "scheduled_departure_date")
    private LocalDateTime scheduledDepartureDate;

    // Плановая дата прилета
    @Column(name = "scheduled_arrival_date")
    private LocalDateTime scheduledArrivalDate;

    // Тип перелета
    @Column(name = "route_type_id")
    private int routeTypeId;
}
