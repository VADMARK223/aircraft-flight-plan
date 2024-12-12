package vadmark.afp.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table

@Entity
@Table(name = "airport")
class Airport {
    @Id
    @Column(name = "airport_id")
    var airportId: Int = 0

    @Column(name = "airport_name")
    var airportName: String? = null

    @Column(name = "icao")
    var icao: String? = null

    @Column(name = "iata")
    var iata: String? = null
}
