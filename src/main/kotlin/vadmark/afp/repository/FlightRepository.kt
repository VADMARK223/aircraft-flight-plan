package vadmark.afp.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import vadmark.afp.entity.Flight

@Repository
interface FlightRepository : JpaRepository<Flight, Int>
