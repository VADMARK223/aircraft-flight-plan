/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 23.11.2023
 */
import React, { JSX } from 'react'
import { Space } from 'antd'
import FlightControl from './flightControl/FlightControl'
import BoardControl from './boardControl/BoardControl'
import ThemeControl from './ThemeControl'
import PlanControl from './planControl/PlanControl'

const ControlPanel = (): JSX.Element => {
	return (
		<Space align={'start'} className={'control-panel'}>
			<Space direction={'vertical'}>
				<BoardControl/>
				<FlightControl/>
				<PlanControl/>
			</Space>
			<ThemeControl/>
		</Space>
	)
}

export default ControlPanel