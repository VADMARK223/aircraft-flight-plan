package vadmark.afp.entity

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import lombok.Data

/**
 * @author Markitanov Vadim
 * @since 08.11.2024
 */
@Entity
@Table(schema = "afp_schema", name = "route")
@Data
data class Route (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var routeId: Int = 0
)
