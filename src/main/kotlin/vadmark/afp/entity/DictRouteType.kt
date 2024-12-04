package vadmark.afp.entity

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(schema = "afp_schema", name = "dict_route_type")
@Getter
@Setter
class DictRouteType {
    @Id
    @Column(name = "route_type_id")
    var id:Int = 0

    @Column(name = "name")
    var name:String = ""
}
