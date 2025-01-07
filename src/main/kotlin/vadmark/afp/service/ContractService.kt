package vadmark.afp.service

import org.springframework.stereotype.Service
import vadmark.afp.entity.Contract
import vadmark.afp.repository.ContractRepository

@Service
class ContractService(private val contractRepo: ContractRepository) {
    fun findById(contractId: Int) = contractRepo.findById(contractId)
    fun saveByName(contractName: String) = contractRepo.save(Contract().apply { label = contractName })
    fun delete(id: Int) = contractRepo.deleteById(id)
}
