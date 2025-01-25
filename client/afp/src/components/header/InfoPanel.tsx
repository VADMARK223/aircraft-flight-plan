/**
 * Компонент информационной панели в заголовке.
 *
 * @author Markitanov Vadim
 * @since 18.12.2024
 */
import React, { JSX } from 'react'
import { Space, Divider } from 'antd'
import { LOCAL_TIME_ZONE, FORMATTED_OFFSET } from '../../utils/utils'

const VERSION = '2.0.0'

const InfoPanel = (): JSX.Element => {
	return (
		<Space direction={'horizontal'}>
			<span>Time zone:</span>
			<b>{LOCAL_TIME_ZONE + ' ' + FORMATTED_OFFSET}</b>
			<Divider type={'vertical'} />
			<span>Version:</span>
			<b>{VERSION}</b>
		</Space>
	)
}

export default InfoPanel
