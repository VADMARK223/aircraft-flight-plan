/**
 * Компонент настройки временной шкалы перелетов
 *
 * @author Markitanov Vadim
 * @since 06.12.2023
 */
import React, { JSX } from 'react'
import { Divider, Space } from 'antd'
import DateControl from './DateControl'

const PlanControl = (): JSX.Element => {
	return (
		<Space direction={'vertical'} style={{width:'100%'}}>
			<Divider type={'horizontal'}
					 orientation={'left'}
					 className={'control-panel-divider'}>Настройки временной шкалы</Divider>
			<DateControl/>
		</Space>
	)
}

export default PlanControl
