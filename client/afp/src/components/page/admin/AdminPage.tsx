/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 24.01.2025
 */
import React, { JSX } from 'react'
import ContractEditor from '../main/top/control/contractEditor/ContractEditor'
import FlightControl from '../main/top/control/flightControl/FlightControl'

const AdminPage = (): JSX.Element => {
	return (
		<>
			<ContractEditor/>
			<FlightControl/>
		</>
	)
}

export default AdminPage
