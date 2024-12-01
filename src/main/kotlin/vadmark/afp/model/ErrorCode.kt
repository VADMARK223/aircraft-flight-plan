package vadmark.afp.model

import lombok.AllArgsConstructor
import lombok.Getter

/**
 * @author Markitanov Vadim
 * @since 01.12.2024
 */
@Getter
@AllArgsConstructor
enum class ErrorCode(string: String) {
    KND_ERROR_CODE_003("Не получена информация о пользователе"),
    KND_ERROR_CODE_026("У вас нет необходимых ролей для работы с сервисом КНД");

    private val errorText: String? = null
}
