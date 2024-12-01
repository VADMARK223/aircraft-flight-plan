/**
 * @author Markitanov Vadim
 * @since 02.12.2023
 */
import ky, { Options, KyResponse } from 'ky'
import { ResponseDto } from '../models/dto/ResponseDto'

const BASE_API_URL: string = `${process.env.REACT_APP_BASE_API_URL || 'http://localhost:8080'}/api/v1`

export const commonApi = ky.create({
	prefixUrl: BASE_API_URL,
	hooks: {
		afterResponse: [
			async (request, options, response) => {
				const responseData = await response.json<ResponseDto<any>>();

				if (responseData.status) {
					// Возвращаем только поле data
					return responseData.data;
				} else {
					throw new Error(`Ошибка: ${responseData.message}`);
				}
			}
			/*async (request: Request, options: Options, response: KyResponse): Promise<any> => {
				if (response.ok) {
					try {
						const responseData = await response.json<ResponseDto<any>>()
						if (responseData.status) {
							console.log('Response data data:', responseData.data)
							return new Response(JSON.stringify(responseData.data), { status: 200 })
						} else {
							throw new Error(`Ошибка: ${responseData.message}`)
						}
					} catch (e) {
						throw new Error('Ошибка при парсинге ответа')
					}

				} else {
					const error: unknown = await response.json()
					if (error instanceof Error) {
						throw new Error(error.message || 'Неизвестная ошибка')
					} else {
						throw new Error('Неизвестная ошибка')
					}
				}
			}*/
		]
	}
})

export async function apiGet<T>(endpoint: string): Promise<T> {
	const response = await commonApi.get(endpoint);
	const responseData: ResponseDto<T> = await response.json();

	if (responseData.status) {
		return responseData.data; // Возвращаем только поле `data`
	} else {
		throw new Error(`Ошибка: ${responseData.message}`);
	}
}
