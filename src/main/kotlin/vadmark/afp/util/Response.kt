package vadmark.afp.util

import vadmark.afp.dto.ResponseDto

object Response {
    fun <D> success(data: D): ResponseDto<D> {
        val result = ResponseDto<D>()
        result.status = true
        result.data = data
        return result
    }

    fun failure(message: String): ResponseDto<Nothing?> {
        val result = ResponseDto<Nothing?>()
        result.status = false
        result.message = message
        return result
    }
}
