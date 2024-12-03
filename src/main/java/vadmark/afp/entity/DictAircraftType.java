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
@Table(schema = "afp_schema", name = "dict_aircraft_type")
@Getter
@Setter
public class DictAircraftType {
    @Id
    @Column(name = "aircraft_type_id")
    private int id;

    @Column(name = "aircraft_type_name")
    private String name;
}
