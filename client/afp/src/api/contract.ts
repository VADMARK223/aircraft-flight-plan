/**
 * Методы API для работы с контрактами.
 *
 * @author Markitanov Vadim
 * @since 07.01.2025
 */
import { createEffect } from 'effector/compat'
import { DictData } from '../models/DictData'
import { apiPost, showSuccess, showWarn } from './common'

export const requestAddContractFx = createEffect<string, DictData | null>(async (contractName: string) => {
	const response: DictData = await apiPost<DictData>('contract/add_contract', {
		json: { name: contractName }
	})

	showSuccess(`Добавлен новый контракт: '${response.value}'.`)

	return response
})

export const requestDeleteContractFx = createEffect<number | undefined, number | null>(async (contractId?: number) => {
	if (contractId === undefined) {
		showWarn('Контракт для удаления не выбран.')
		return null
	}
	const response: number = await apiPost<number>('contract/delete_contract', {
		json: contractId
	})

	showSuccess(`Контракт '${response}' успешно удален.`)

	return response
})
