/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 19.01.2025
 */
import React, { JSX, useEffect, useState } from 'react'
import { Tree } from 'antd'
import FlightIInfoItem from './FlightIInfoItem'
import type { DataNode } from 'antd/es/tree'
import { useStore } from 'effector-react'
import { $flightsSelected } from '../../../../store/flight'
import { Flight } from '../../../../models/Flight'

const ROOT_ELEMENT_KEY = '0-0'

const FlightsInfo = (): JSX.Element => {
	const flightsSelected: Flight[] = useStore($flightsSelected)
	const [treeData, setTreeData] = useState<DataNode[]>([])

	useEffect(() => {
		setTreeData([
			{
				title: <span> {'Flights Info'}</span>,
				key: ROOT_ELEMENT_KEY,
				children: flightsSelected.map((flight) => ({
					key: `flight-${flight.id}`,
					title: <FlightIInfoItem title={`Flight ID: ${flight.id}`}/>
				}))
			}
		])
	}, [flightsSelected])

	return (
		<>
			{flightsSelected.length
				? <Tree treeData={treeData} expandedKeys={[ROOT_ELEMENT_KEY]}/>
				: <span>No flights selected.</span>}
		</>
	)
}

export default FlightsInfo
