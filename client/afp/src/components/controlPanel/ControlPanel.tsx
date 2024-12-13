/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 23.11.2023
 */
import React, { JSX } from 'react'
import { Space } from 'antd'
import FlightControl from './flightControl/FlightControl'
import InfoPanel from './InfoPanel'
import PlanControl from './planControl/PlanControl'
import RouteControl from './routeControl/RouteControl'

const ControlPanel = (): JSX.Element => {
	return (
		<Space align={'start'} className={'control-panel'}>
			<Space direction={'vertical'}>
				<FlightControl/>
				<RouteControl/>
				<div style={{ marginBottom: 5 }}>
					<PlanControl/>
				</div>
			</Space>
			<InfoPanel/>
		</Space>
	)
}

export default ControlPanel
