import { createEffect } from 'effector/compat'
import { commonApi } from './common'
import { Flight } from '../models/Flight'

/**
 * @author Markitanov Vadim
 * @since 02.12.2023
 */

export const fetchBoardsFx = createEffect<void, Flight[]>(async () => {
	try {
		return await commonApi.get('boards/get_all').json<Flight[]>()
	} catch (error: any) {
		console.log('Error', error)
		return []
	}
})
