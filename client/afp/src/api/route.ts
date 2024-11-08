import { createEffect } from 'effector/compat'
import { commonApi } from './common'

/**
 * @author Markitanov Vadim
 * @since 08.11.2024
 */
export const fetchRoutesFx = createEffect<void, any>(async () => {
	try {
		return await commonApi.get('route/get_all').json<any>()
	} catch (error: any) {
		console.log('Error', error)
		return 'Unknown'
	}
})
