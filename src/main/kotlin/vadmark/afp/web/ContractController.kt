package vadmark.afp.web

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import vadmark.afp.dto.FlightDto
import vadmark.afp.dto.ResponseDto
import vadmark.afp.entity.Contract
import vadmark.afp.model.dto.DictDto
import vadmark.afp.service.ContractService
import vadmark.afp.util.Response

@RestController
@RequestMapping("\${api.prefix}/contract")
class ContractController(
    private val service: ContractService,
) {
    @GetMapping("/get_contracts")
    fun getAll(): ResponseEntity<ResponseDto<List<DictDto>>> {
        return ResponseEntity.ok(Response.success(service.findAll()))
    }

    @PostMapping("/add_contract")
    fun add(@RequestBody request: ContractRequest): ResponseEntity<ResponseDto<Contract>> {
        val contract = service.saveByName(request.name)
        return ResponseEntity.ok(Response.success(contract))
    }

    @PostMapping("/delete_contract")
    fun delete(@RequestBody contractId: Int): ResponseEntity<ResponseDto<Int>> {
        service.delete(contractId)
        return ResponseEntity.ok(Response.success(contractId))
    }
}

data class ContractRequest(val name: String)
