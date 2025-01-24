/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 19.01.2025
 */
import React from 'react'
import DeleteButton from '../../main/top/control/flightControl/DeleteButton'

interface FlightIInfoItemProps {
	title: string
}

const FlightIInfoItem = ({ title }: FlightIInfoItemProps) => {
	return (
		<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
			{/*<span>🌟</span>*/}
			<span>{title}</span>
			<DeleteButton/>
		</div>
	)
}

export default FlightIInfoItem
