package vadmark.afp.service

import org.springframework.stereotype.Service
import vadmark.afp.entity.Flight
import vadmark.afp.repository.FlightRepository

@Service
class FlightService(private val repository: FlightRepository) {
    fun findAll(): List<Flight> = repository.findAll()
}
