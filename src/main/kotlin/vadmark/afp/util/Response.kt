package vadmark.afp.util

import vadmark.afp.dto.ResponseDto

object Response {
    fun <D> success(data: D): ResponseDto<D> {
        val result = ResponseDto<D>()
        result.status = true
        result.data = data
        return result
    }

    fun <Any> failure(message: String): ResponseDto<Any> {
        val result = ResponseDto<Any>()
        result.status = false
        result.message = message
        return result
    }
}
