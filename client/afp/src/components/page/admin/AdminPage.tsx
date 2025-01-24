/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 24.01.2025
 */
import React, { JSX } from 'react'
import ContractEditor from '../main/top/control/contractEditor/ContractEditor'
import FlightControl from '../main/top/control/flightControl/FlightControl'
import RouteControl from '../main/top/control/routeControl/RouteControl'

const AdminPage = (): JSX.Element => {
	return (
		<>
			<ContractEditor/>
			<FlightControl/>
			<RouteControl/>
		</>
	)
}

export default AdminPage
