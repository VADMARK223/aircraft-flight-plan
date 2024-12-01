/**
 * @author Markitanov Vadim
 * @since 02.12.2023
 */
import ky from 'ky'
import { ResponseDto } from '../models/dto/ResponseDto'
import { toast } from 'react-toastify'

const BASE_API_URL: string = `${process.env.REACT_APP_BASE_API_URL || 'http://localhost:8080'}/api/v1`

export const commonApi = ky.create({
	prefixUrl: BASE_API_URL,
	hooks: {
		afterResponse: [
			async (_request, _options, response) => {
				const responseData = await response.json<ResponseDto<any>>()

				if (responseData.status) {
					return responseData.data
				} else {
					throw new Error(`Ошибка: ${responseData.message}`)
				}
			}
		]
	}
})

export async function apiGet<T> (endpoint: string): Promise<T> {
	try {
		const response = await commonApi.get(endpoint)
		const responseData: ResponseDto<T> = await response.json()

		if (responseData.status) {
			return responseData.data // Возвращаем только поле `data`
		} else {
			throw new Error(`Ошибка: ${responseData.message}`)
		}
	} catch (error) {
		if (error instanceof Error) {
			showError(error.message)
		} else {
			showError('Неизвестная ошибка.')
		}

		return Promise.reject(error)
	}
}

export const showError = (message: string) => {
	toast.error(message)
}
