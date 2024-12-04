package vadmark.afp.service

import org.springframework.stereotype.Service
import vadmark.afp.repository.ContractRepository

@Service
class ContractService(private val contractRepo:ContractRepository) {
    fun findById(contractId: Int) = contractRepo.findById(contractId)
}
