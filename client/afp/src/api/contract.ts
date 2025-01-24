/**
 * Методы API для работы с контрактами.
 *
 * @author Markitanov Vadim
 * @since 07.01.2025
 */
import { createEffect } from 'effector/compat'
import { DictData } from '../models/DictData'
import { apiPost, showSuccess, showWarn, apiGet } from './common'

const ENDPOINT = 'contract'

export const fetchContractsFx = createEffect<void, DictData[]>(async () => {
	return await apiGet<DictData[]>(`${ENDPOINT}/get_contracts`)
})

export const requestAddContractFx = createEffect<string, DictData | null>(async (contractName: string) => {
	const response: DictData = await apiPost<DictData>(`${ENDPOINT}/add_contract`, {
		json: { name: contractName }
	})

	showSuccess(`New reg. number added: '${response.value}'.`)

	return response
})

export const requestDeleteContractFx = createEffect<number | undefined, number | null>(async (contractId?: number) => {
	if (contractId === undefined) {
		showWarn('No reg.number selected for deletion.')
		return null
	}
	const response: number = await apiPost<number>(`${ENDPOINT}/delete_contract`, {
		json: contractId
	})

	showWarn(`Reg.number '${response}' successfully deleted.`)

	return response
})
