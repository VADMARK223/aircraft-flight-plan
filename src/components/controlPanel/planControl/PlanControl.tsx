/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 06.12.2023
 */
import React, { JSX } from 'react'
import { Divider, Space } from 'antd'
import DateControl from './DateControl'

const PlanControl = (): JSX.Element => {
	return (
		<Space direction={'vertical'}>
			<Divider type={'horizontal'}
					 orientation={'left'}
					 className={'control-panel-divider'}>Настройки полетов</Divider>
			<DateControl/>
		</Space>
	)
}

export default PlanControl