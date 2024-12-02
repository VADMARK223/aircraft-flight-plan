package vadmark.afp.service

import org.springframework.stereotype.Service
import vadmark.afp.entity.Flight
import vadmark.afp.repository.FlightRepository
import vadmark.afp.repository.ContractRepository

@Service
class FlightService(private val flightRepo: FlightRepository, private val contractRepo: ContractRepository) {
    fun findAll(): List<Flight> = flightRepo.findAll()
    fun add(contactId: Int):Flight {
        val flight = Flight()
        val contract = contractRepo.findById(contactId).orElse(null)
        flight.contract = contract
        return flightRepo.save(flight)
    }
}
