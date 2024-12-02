package vadmark.afp.entity

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.CascadeType
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.OneToMany
import jakarta.persistence.Table

@Entity
@Table(name = "contract", schema = "afp_schema")
class Contract {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contract_id")
    var contractId: Int = 0

    @OneToMany(mappedBy = "contract", cascade = [(CascadeType.ALL)], fetch = FetchType.LAZY)
    @JsonIgnore
    var flights: List<Flight> = mutableListOf()
}
