package vadmark.afp.dto

class ResponseDto<D> {
    var status: Boolean = false
    var message: String? = null
    var data: D? = null
}
