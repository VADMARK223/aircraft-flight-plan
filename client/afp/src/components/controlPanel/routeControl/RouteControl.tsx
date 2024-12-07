/**
 * Компонент управлением перелетами.
 *
 * @author Markitanov Vadim
 * @since 23.11.2023
 */
import React, { JSX, useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { $routeSelect, routeAddFx, flightBoardIdChanged, routeDeleteFx } from '../../../store/route'
import { routeEditFx, $flights } from '../../../store/flight'
import { Dayjs } from 'dayjs'
import { Button, DatePicker, Divider, Select, SelectProps, Space } from 'antd'
import { combineDateTime } from '../../../utils/utils'
import { toast } from 'react-toastify'
import { DATE_FORMAT } from '../../../utils/consts'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import type { RangeValueType } from 'rc-picker/lib/PickerInput/RangePicker'
import { Route } from '../../../models/Route'
import { $airports } from '../../../store/airport'
import { $routeTypeDictStore } from '../../../store/dict'
import { DictDto } from '../../../models/dto/DictDto'
import AircraftTypeSelect from './AircraftTypeSelect'
import { fetchAirportsFx } from '../../../api/dict'

const RouteControl = (): JSX.Element => {
	const route = useStore($routeSelect)
	const flights = useStore($flights)
	const airports = useStore($airports)
	const routeTypes = useStore($routeTypeDictStore)
	const [doneButtonDisable, setDoneButtonDisable] = useState<boolean>(true)
	const [flightId, setFlightId] = useState<number | undefined>()
	const [routeType, setRouteType] = useState<number>(-1)
	const [dateRangeValue, setDateRangeValue] = useState<RangeValueType<Dayjs> | null>(null)
	const [timeRangeValue, setTimeRangeValue] = useState<RangeValueType<Dayjs> | null>(null)
	const [airportStart, setAirportStart] = useState<string | undefined>()
	const [airportEnd, setAirportEnd] = useState<string | undefined>()
	const [routeTypeOptions, setRouteTypeOptions] = useState<DictDto[]>([])

	useEffect(() => {
		fetchAirportsFx()
	}, [])

	useEffect(() => {
		setFlightId(route?.flightId)
		setAirportStart(route?.airportStart)
		setAirportEnd(route?.airportEnd)
		if (route) {
			setDateRangeValue([route.scheduledDepartureDate, route.scheduledArrivalDate])
			setTimeRangeValue([route.scheduledDepartureDate, route.scheduledArrivalDate])
		} else {
			setDateRangeValue(null)
			setTimeRangeValue(null)
		}

	}, [route])

	useEffect(() => {
		if (routeTypes.length !== 0) {
			setRouteTypeOptions(routeTypes)
			setRouteType(routeTypes[0].value)
		}
	}, [routeTypes])

	let flightOptions: SelectProps['options'] = []
	flights.forEach(flight => {
		flightOptions?.push({ value: flight.id, label: `Рейс ${flight.id}` })
	})

	useEffect(() => {
		setDoneButtonDisable(flightId === undefined || dateRangeValue === null || timeRangeValue === null || airportStart === undefined || airportEnd === undefined)
	}, [flightId, dateRangeValue, timeRangeValue, airportStart, airportEnd])

	const handlerFlightSelectChange = (value: number | undefined): void => {
		setFlightId(value)
	}

	/**
	 * Метод подтверждения добавления перелета.
	 */
	const handlerAddRoute = (): void => {
		if (flightId === undefined || dateRangeValue === null || timeRangeValue === null || airportStart === undefined || airportEnd === undefined) {
			return
		}

		const newStartDate: Dayjs = combineDateTime(dateRangeValue[0], timeRangeValue[0])
		const newEndDate: Dayjs = combineDateTime(dateRangeValue[1], timeRangeValue[1])

		if (newStartDate.isBefore(newEndDate)) {
			const newRoute: Route = {
				id: -1,
				flightId: flightId,
				routeTypeId: routeType,
				scheduledDepartureDate: newStartDate,
				scheduledArrivalDate: newEndDate,
				airportStart: airportStart,
				airportEnd: airportEnd
			}

			routeAddFx(newRoute)
		} else {
			toast.warn('Время вылета превышает или совпадает с временем прилета.')
		}

		setFlightId(undefined)
		setDateRangeValue(null)
		setTimeRangeValue(null)
		setAirportStart(undefined)
		setAirportEnd(undefined)
	}

	/**
	 * Метод подтверждения изменения полета.
	 */
	const handlerEditFlight = (): void => {
		if (dateRangeValue != null && timeRangeValue != null) {
			const newStartDate: Dayjs = combineDateTime(dateRangeValue[0], timeRangeValue[0])
			const newEndDate: Dayjs = combineDateTime(dateRangeValue[1], timeRangeValue[1])
			if (newStartDate.isBefore(newEndDate)) {
				if (flightId && route && airportStart && airportEnd) {
					const updatedRoute: Route = {
						...route,
						scheduledDepartureDate: newStartDate,
						scheduledArrivalDate: newEndDate,
						airportStart: airportStart,
						airportEnd: airportEnd
					}
					if (route.flightId === flightId) {
						routeEditFx(updatedRoute)
					} else {
						routeDeleteFx(route)
						flightBoardIdChanged(flightId)
					}
				}
			} else {
				toast.warn('Время вылета превышает или совпадает с временем прилета.')
			}
		}
	}

	const airportSelectOptions: SelectProps['options'] = airports.map(airport => {
		return { value: airport.value, label: airport.label }
	})

	return (
		<Space direction={'vertical'}>
			<Divider type={'horizontal'}
					 orientation={'left'}
					 className={'control-panel-divider'}>Изменение перелета</Divider>
			<Space align={'start'}>
				<Space direction={'vertical'} align={'end'}>
					<Space>
						<span>Рейс:</span>
						<Select placeholder={'Выберите рейс'}
								value={flightId}
								options={flightOptions}
								style={{ minWidth: '150px' }}
								onChange={handlerFlightSelectChange}
								allowClear
								showSearch
								filterOption={(input, opt) => {
									return (opt?.label !== null && opt?.label !== undefined ? JSON.stringify(opt.label).toLowerCase().includes(input.toLowerCase()) : true)
								}}
						/>
					</Space>
					<Space>
						<span>Тип:</span>
						<Select placeholder={'Выберите тип'}
								value={routeType}
								options={routeTypeOptions}
								style={{ minWidth: '150px' }}
								onChange={value => {
									setRouteType(value)
								}}
								showSearch
								filterOption={(input, opt) => {
									return (opt?.label !== null && opt?.label !== undefined ? JSON.stringify(opt.label).toLowerCase().includes(input.toLowerCase()) : true)
								}}
						/>
					</Space>
				</Space>
				<Space direction={'vertical'} align={'end'}>
					<Space>
						<span>Дата:</span>
						<DatePicker.RangePicker value={dateRangeValue}
												style={{ minWidth: '300px' }}
												onChange={setDateRangeValue}
												format={DATE_FORMAT}
												picker={'date'}
						/>
					</Space>
					<Space>
						<span>Время:</span>
						<DatePicker.RangePicker value={timeRangeValue}
												style={{ minWidth: '300px' }}
												onChange={setTimeRangeValue}
												picker={'time'}
												format={'HH:mm'}
						/>
					</Space>
				</Space>

				<Space direction={'vertical'} align={'end'}>
					<Space>
						<Select
							placeholder={'Аэропорт вылета'}
							value={airportStart}
							options={airportSelectOptions}
							onChange={setAirportStart}
							style={{ width: '160px' }}
							popupMatchSelectWidth={false}
						/>
						<Select
							placeholder={'Аэропорт прилета'}
							value={airportEnd}
							options={airportSelectOptions}
							onChange={setAirportEnd}
							style={{ width: '160px' }}
							popupMatchSelectWidth={false}
						/>
					</Space>
					<Space>
						<span>Тип борта:</span>
						<AircraftTypeSelect/>
					</Space>
				</Space>

				{route ?
					<Space direction={'vertical'}>
						<Button type={'primary'}
								icon={<EditOutlined/>}
								disabled={doneButtonDisable}
								onClick={handlerEditFlight}
								style={{ width: '160px' }}
						>Изменить перелет</Button>
						<Button type={'primary'}
								danger
								icon={<DeleteOutlined/>}
								style={{ width: '160px' }}
								onClick={() => {
									routeDeleteFx(route)
								}}
						>Удалить перелет</Button>
					</Space>
					:
					<Button type={'primary'}
							icon={<PlusOutlined/>}
							disabled={doneButtonDisable}
							onClick={handlerAddRoute}
							style={{ width: '160px' }}
					>Добавить перелет</Button>
				}


			</Space>
		</Space>
	)
}

export default RouteControl
