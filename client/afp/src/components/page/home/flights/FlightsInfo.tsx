/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 19.01.2025
 */
import React, { JSX } from 'react'
import { Tree } from 'antd'
import { Flight } from '../../../../models/Flight'
import FlightIInfoItem from './FlightIInfoItem'

interface FlightsInfoProps {
	data: Flight[]
}

const FlightsInfo = ({ data }: FlightsInfoProps): JSX.Element => {
	const treeData = [
		{
			title: <FlightIInfoItem title="Flights Info"/>,
			key: '0-0',
			children: data.map((flight) => ({
				key: `flight-${flight.id}`,
				title: <FlightIInfoItem title={`Flight ID: ${flight.id}`}/>
			}))
		}
	]

	return (
		<>
			{data.length ? <Tree treeData={treeData}/> : <span>Рейсы не выбраны.</span>}
		</>
	)
}

export default FlightsInfo
