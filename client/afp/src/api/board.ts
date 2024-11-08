import { createEffect } from 'effector/compat'
import { commonApi } from './common'
import { Board } from '../models/Board'

/**
 * @author Markitanov Vadim
 * @since 02.12.2023
 */

export const fetchBoardsFx = createEffect<void, Board[]>(async () => {
	try {
		return await commonApi.get('boards/get_all').json<Board[]>()
	} catch (error: any) {
		console.log('Error', error)
		return []
	}
})