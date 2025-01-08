package vadmark.afp.service

import org.springframework.stereotype.Service
import vadmark.afp.entity.Contract
import vadmark.afp.mapper.ContractMapper
import vadmark.afp.repository.ContractRepository

@Service
class ContractService(
    private val contractRepo: ContractRepository,
    private val contractMapper: ContractMapper
) {
    fun findAll() = contractMapper.toDoList(contractRepo.findAll())
    fun findById(contractId: Int) = contractRepo.findById(contractId)
    fun saveByName(contractName: String) = contractRepo.save(Contract().apply { label = contractName })
    fun delete(id: Int) = contractRepo.deleteById(id)
}
