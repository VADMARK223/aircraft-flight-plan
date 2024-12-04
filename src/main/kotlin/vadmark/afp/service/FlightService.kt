package vadmark.afp.service

import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service
import vadmark.afp.entity.Flight
import vadmark.afp.repository.ContractRepository
import vadmark.afp.repository.FlightRepository

@Service
class FlightService(private val flightRepo: FlightRepository, private val contractRepo: ContractRepository) {
    fun findAll(): List<Flight> = flightRepo.findAll(Sort.by(Sort.Direction.ASC, "flightId"))
    fun add(contactId: Int): Flight {
        val flight = Flight()
        val contract = contractRepo.findById(contactId).orElse(null)
        flight.contract = contract
        return flightRepo.save(flight)
    }

    fun delete(flightId: Int) = flightRepo.deleteById(flightId)
    fun save(flight: Flight) = flightRepo.save(flight)
    fun deleteAll(): Unit = flightRepo.deleteAll()
}
