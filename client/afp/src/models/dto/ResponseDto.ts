/**
 * @author Markitanov Vadim
 * @since 01.12.2024
 */
export interface ResponseDto<T> {
	status: boolean
	message: null | string
	data: T
}
