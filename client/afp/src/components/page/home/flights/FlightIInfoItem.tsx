/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 19.01.2025
 */
import React from 'react'

interface FlightIInfoItemProps {
	title: string
}

const FlightIInfoItem = ({ title }: FlightIInfoItemProps) => {
	return (
		<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
			{/*<span>🌟</span>*/}
			<span>{title}</span>
		</div>
	)
}

export default FlightIInfoItem
