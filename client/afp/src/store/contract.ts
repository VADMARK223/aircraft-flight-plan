import { createStore } from 'effector'
import { DictData } from '../models/DictData'
import { fetchContractsFx } from '../api/contract'

/**
 * Хранилище контрактов.
 *
 * @author Markitanov Vadim
 * @since 08.01.2025
 */
export const $contracts = createStore<DictData[]>([])
$contracts.on(fetchContractsFx.doneData, (_, payload) => payload)
