package vadmark.afp.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table

@Entity
@Table(schema = "afp_schema", name = "dict_route_type")
class DictRouteType {
    @Id
    @Column(name = "route_type_id")
    var value: Int = 0

    @Column(name = "name")
    var label: String = ""
}