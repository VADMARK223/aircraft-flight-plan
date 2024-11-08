import { createEffect } from 'effector/compat'
import { commonApi } from './common'

/**
 * @author Markitanov Vadim
 * @since 08.11.2024
 */
export const fetchUserInfoFx = createEffect<void, string>(async () => {
	try {
		return await commonApi.get('user/info').text()
	} catch (error: any) {
		console.log('Error', error)
		return 'Unknown'
	}
})
