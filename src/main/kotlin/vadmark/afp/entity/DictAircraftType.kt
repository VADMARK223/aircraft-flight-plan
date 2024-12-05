package vadmark.afp.entity

import jakarta.persistence.Column;
import jakarta.persistence.Entity
import jakarta.persistence.Id;
import jakarta.persistence.Table

@Entity
@Table(schema = "afp_schema", name = "dict_aircraft_type")
class DictAircraftType {
    @Id
    @Column(name = "aircraft_type_id")
    var aircraftTypeId: Int = 0

    @Column(name = "aircraft_type_name")
    var aircraftTypeName: String = ""
}
