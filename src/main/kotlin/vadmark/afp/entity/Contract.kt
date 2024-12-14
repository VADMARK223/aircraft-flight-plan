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
@Table(name = "contract")
class Contract {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contract_id")
    var value: Int = 0

    @Column(name = "name")
    var label: String = "Unknown"

    @OneToMany(mappedBy = "contract", cascade = [(CascadeType.ALL)], fetch = FetchType.LAZY)
    @JsonIgnore
    var flights: List<Flight> = mutableListOf()

    override fun toString(): String {
        return "Contract(contractId=$value, name=$label)"
    }
}
