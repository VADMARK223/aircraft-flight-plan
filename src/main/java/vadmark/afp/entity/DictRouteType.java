package vadmark.afp.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

/**
 * @author Markitanov Vadim
 * @since 03.12.2024
 */
@Entity
@Table(schema = "afp_schema", name = "dict_route_type")
@Getter
@Setter
public class DictRouteType {
    @Id
    @Column(name = "route_type_id")
    private int value;

    @Column(name = "name")
    private String label;
}
