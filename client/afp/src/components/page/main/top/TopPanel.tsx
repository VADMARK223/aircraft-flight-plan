/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 18.12.2024
 */
import React, { JSX } from 'react'
import { Space } from 'antd'
import RouteControl from './control/routeControl/RouteControl'
import DateControl from './control/DateControl'
import ContractEditor from './control/contractEditor/ContractEditor'

const TopPanel = (): JSX.Element => {
	return (
		<div id={'top-panel'} style={{ display: 'flex' }}>
			<div style={{ flex: 1 }}>
				<Space direction={'vertical'} style={{ width: '100%' }}>
					<ContractEditor/>
					<RouteControl/>
					<DateControl/>
				</Space>
			</div>
		</div>
	)
}

export default TopPanel
