/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 24.01.2025
 */
import React, { JSX, useState, useEffect } from 'react'
import { Table } from 'antd'
import { useStore } from 'effector-react'
import { $flightsSelected } from '../../../../store/flight'
import { HomeTableData } from './HomeTableData'
import { Flight } from '../../../../models/Flight'
import { Route } from '../../../../models/Route'
import { RouteTypeNames, RouteType } from '../../main/bottom/route/routeUtils'

const HomeTable = (): JSX.Element => {
	const flightsSelected = useStore($flightsSelected)
	const [dataSource, setDataSource] = useState<HomeTableData[]>([])

	useEffect(() => {
		const result: HomeTableData[] = []
		flightsSelected.forEach((flight: Flight) => {
			flight.routes.forEach((route: Route) => {
				result.push({
					id: route.id,
					regNumber: flight.contract.label,
					scheduledArrivalDate: route.scheduledArrivalDate.format('DD.MM.YYYY HH:mm'),
					scheduledDepartureDate: route.scheduledDepartureDate.format('DD.MM.YYYY HH:mm'),
					type: route.routeTypeId,
					aptArrIata: route.aptArrIata,
					aptArrIcao: route.aptArrIcao,
					aptArrName: route.aptArrName,
					aptDeptIata: route.aptDeptIata,
					aptDeptIcao: route.aptDeptIcao,
					aptDeptName: route.aptDeptName
				})
			})
		})
		setDataSource(result)
	}, [flightsSelected])

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id'
		},
		{
			title: 'Scheduled',
			children: [
				{
					title: 'Arrival',
					dataIndex: 'scheduledArrivalDate'
				},
				{
					title: 'Departure',
					dataIndex: 'scheduledDepartureDate'
				}
			]
		},
		{
			title: 'Reg.num',
			dataIndex: 'regNumber'
		},
		{
			title: 'Type',
			dataIndex: 'type',
			render: (routeTypeId:RouteType) => {
				return (<>{RouteTypeNames[routeTypeId]}</>)
			}
		},
		{
			title: 'Departure airport',
			children: [
				{
					title: 'IATA',
					dataIndex: 'aptDeptIata'
				}, {
					title: 'ICAO',
					dataIndex: 'aptDeptIcao'
				}, {
					title: 'Name',
					dataIndex: 'aptDeptName'
				}
			]
		}, {
			title: 'Arrival airport',
			children: [
				{
					title: 'IATA',
					dataIndex: 'aptArrIata'
				}, {
					title: 'ICAO',
					dataIndex: 'aptArrIcao'
				}, {
					title: 'Name',
					dataIndex: 'aptArrName'
				}
			]
		}
	]

	return <Table rowKey={'id'} dataSource={dataSource} columns={columns}/>
}

export default HomeTable
