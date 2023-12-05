/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 23.11.2023
 */
import React, { JSX } from 'react'
import { Space } from 'antd'
import FlightControl from './flightControl/FlightControl'
import DateControl from './DateControl'
import BoardControl from './boardControl/BoardControl'

const ControlPanel = (): JSX.Element => {
	return (
		<div style={{ paddingTop: '5px', paddingLeft: '5px' }}>
			<Space direction={'vertical'} style={{ width: '100%' }}>
				<BoardControl/>
				<FlightControl/>
				<DateControl/>
			</Space>
		</div>
	)
}

export default ControlPanel