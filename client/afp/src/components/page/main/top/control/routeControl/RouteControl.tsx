/**
 * Компонент добавления/изменения перелетов.
 *
 * @author Markitanov Vadim
 * @since 23.11.2023
 */
import React, { JSX, useEffect, useState, useCallback } from 'react'
import { useStore } from 'effector-react'
import { $routeSelected } from '../../../../../../store/route'
import { $flights, $flightsSelected } from '../../../../../../store/flight'
import dayjs, { Dayjs } from 'dayjs'
import { Button, DatePicker, Divider, Select, SelectProps, Space, Tooltip, TimePicker } from 'antd'
import { combineDateTime } from '../../../../../../utils/utils'
import { getRandomNumber } from '../../../../../../utils/math'
import { toast } from 'react-toastify'
import { DATE_FORMAT } from '../../../../../../utils/consts'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import type { RangeValueType } from 'rc-picker/lib/PickerInput/RangePicker'
import { $airports } from '../../../../../../store/airport'
import { $routeTypeDictStore } from '../../../../../../store/dict'
import { DictData } from '../../../../../../models/DictData'
import AircraftTypeSelect from './AircraftTypeSelect'
import { fetchAirportsFx } from '../../../../../../api/airport'
import { Airport } from '../../../../../../models/Airport'
import { requestDeleteRouteFx, requestAddOrSaveRouteFx } from '../../../../../../api/route'
import { showWarn } from '../../../../../../api/common'
import { Route } from '../../../../../../models/Route'

const RouteControl = (): JSX.Element => {
	const routeSelected = useStore($routeSelected)
	const flightsSelected = useStore($flightsSelected)
	const flightSelected = flightsSelected.at(-1)
	const flights = useStore($flights)
	const airports = useStore($airports)
	const routeTypes = useStore($routeTypeDictStore)

	const [flightId, setFlightId] = useState<number>()
	const [routeType, setRouteType] = useState<number | null>()
	const [dateRangeValue, setDateRangeValue] = useState<RangeValueType<Dayjs> | null>()
	const [startTime, setStartTime] = useState<Dayjs | null>()
	const [endTime, setEndTime] = useState<Dayjs | null>()
	const [airportDeparture, setAirportDeparture] = useState<Airport | null>()
	const [airportArrival, setAirportArrival] = useState<Airport | null>()
	const [routeTypeOptions, setRouteTypeOptions] = useState<DictData[]>([])

	const [title, setTitle] = useState<string>()
	const [disableButtonReason, setDisableButtonReason] = useState<string | null>()

	useEffect(() => {
		fetchAirportsFx()
	}, [])

	useEffect(() => {
		if (routeSelected) {
			setTitle('Route change')
			setDateRangeValue([routeSelected.scheduledDepartureDate, routeSelected.scheduledArrivalDate])
			setStartTime(routeSelected.scheduledDepartureDate)
			setEndTime(routeSelected.scheduledArrivalDate)
			setAirportDeparture({
				airportId: routeSelected.airportDepartureId,
				iata: routeSelected.aptDeptIata,
				icao: routeSelected.aptDeptIcao,
				airportName: routeSelected.aptDeptName
			})

			setAirportArrival({
				airportId: routeSelected.airportArrivalId,
				iata: routeSelected.aptArrIata,
				icao: routeSelected.aptArrIcao,
				airportName: routeSelected.aptArrName
			})
		} else {
			setTitle('Adding a route')
			resetData()
		}

	}, [routeSelected])

	useEffect(() => {
		if (routeTypes.length !== 0) {
			setRouteTypeOptions(routeTypes)
			if (routeSelected) {
				setRouteType(routeSelected.routeTypeId)
			} else {
				setRouteType(routeTypes[1].value)
			}
		}
	}, [routeTypes, routeSelected])

	useEffect(() => {
		if (routeSelected) {
			setFlightId(routeSelected.flightId)
		} else {
			setFlightId(flightSelected != null ? flightSelected.id : undefined)
		}
	}, [flightSelected, routeSelected])

	const resetData = (): void => {
		setDateRangeValue(null)
		setRouteType(null)
		setStartTime(null)
		setEndTime(null)
		setAirportDeparture(null)
		setAirportArrival(null)
	}

	const flightOptions: SelectProps['options'] = []
	flights.forEach(flight => {
		flightOptions?.push({ value: flight.id, label: `Рейс ${flight.id}` })
	})

	const handlerFlightSelectChange = (value: number | undefined): void => {
		setFlightId(value)
	}

	const getDisableButtonReason = useCallback((): string | null => {
		if (flightId === undefined) return 'Выберите рейс перелета'
		if (routeType === null) return 'Выберите тип перелета'
		if (dateRangeValue == null) return 'Выберите даты'
		if (startTime == null) return 'Выберите время вылета'
		if (endTime == null) return 'Выберите время прилета'
		if (airportDeparture == null) return 'Выберите аэропорт вылета'
		if (airportArrival == null) return 'Выберите прилета вылета'

		return null
	}, [flightId, routeType, dateRangeValue, /*timeRangeValue,*/startTime, endTime, airportDeparture, airportArrival])

	useEffect(() => {
		setDisableButtonReason(getDisableButtonReason)
	}, [getDisableButtonReason])

	/**
	 * Общий метод для добавления и редактирования перелета.
	 */
	const handlerAddOrEditRoute = (): void => {
		if (getDisableButtonReason() !== null) {
			toast.warn(disableButtonReason)
			return
		}

		if (dateRangeValue == null) {
			return
		}

		const newStartDate: Dayjs = combineDateTime(dateRangeValue[0], startTime)
		const newEndDate: Dayjs = combineDateTime(dateRangeValue[1], endTime)

		if (newStartDate.isSame(newEndDate, 'day')) {
			// Даты совпадают, сравниваем время.
			if (!newEndDate.isAfter(newStartDate, 'minute')) {
				toast.warn('Время вылета превышает дату прилета.')
			} else {
				// toast.success('Все хорошо.')
				toast.success('The route has been added successfully.')
			}
		} else {
			// Даты не совпадают, проверяем, чтобы финишная дата не была раньше стартовой.
			if (newEndDate.isAfter(newStartDate, 'day')) {
				toast.warn('Дата вылета превышает дату прилета.')
			} else {
				// toast.success('Все хорошо.')
				toast.success('The route has been added successfully.')
			}
		}

		const newRoute: Route = {
			id: routeSelected ? routeSelected.id : null,
			flightId: flightId as number,
			routeTypeId: routeType as number,
			scheduledDepartureDate: newStartDate,
			scheduledArrivalDate: newEndDate,
			airportDepartureId: (airportDeparture as Airport).airportId,
			aptDeptIata: (airportDeparture as Airport).iata,
			aptDeptIcao: (airportDeparture as Airport).icao,
			aptDeptName: (airportDeparture as Airport).airportName,

			airportArrivalId: (airportArrival as Airport).airportId,
			aptArrIata: (airportArrival as Airport).iata,
			aptArrIcao: (airportArrival as Airport).icao,
			aptArrName: (airportArrival as Airport).airportName
		}

		requestAddOrSaveRouteFx(newRoute)

		// Если добавление перелета, то сбрасываем все данные после добавления
		if (routeSelected === null) {
			resetData()
		}
	}

	const airportSelectOptions: SelectProps<Airport>['options'] = airports.map(airport => {
		return {
			value: airport.airportId,
			label: `${airport.airportName} (${airport.iata})`,
			data: airport
		}
	})

	const handlerGenerateRoute = () => {
		if (flightId === undefined || flightSelected == null) {
			if (flights.length !== 0) {
				setFlightId(flights[getRandomNumber(0, flights.length)].id)
			}
		}
		setRouteType(routeTypes[getRandomNumber(0, routeTypes.length)].value)
		const minDifference = getRandomNumber(3, 6)
		const departureHours = getRandomNumber(3, 12)
		const arrivalHours = departureHours + minDifference
		const scheduledDepartureDate = dayjs().startOf('day').add(departureHours, 'hours')
		const scheduledArrivalDate = dayjs().startOf('day').add(arrivalHours, 'hours')
		setDateRangeValue([scheduledDepartureDate, scheduledArrivalDate])
		setStartTime(scheduledDepartureDate)
		setEndTime(scheduledArrivalDate)
		setAirportDeparture(airports[getRandomNumber(0, airports.length)])
		setAirportArrival(airports[getRandomNumber(0, airports.length)])
	}

	return (
		<Space direction={'vertical'} style={{ width: '100%' }}>
			<Divider type={'horizontal'}
					 orientation={'left'}
					 className={'control-panel-divider'}>{title}</Divider>
			<Space align={'start'}>
				<Space direction={'vertical'} align={'end'}>
					<Space>
						<span>Flight:</span>
						<Select placeholder={'Select flight'}
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
						<span>Type:</span>
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
						<span>Date:</span>
						<DatePicker.RangePicker value={dateRangeValue}
												style={{ minWidth: '300px' }}
												onChange={setDateRangeValue}
												format={DATE_FORMAT}
												picker={'date'}
						/>
					</Space>
					<Space size={0}>
						<span>Time:</span>
						<TimePicker
							value={startTime}
							style={{ minWidth: '150px' }}
							onChange={(value: Dayjs) => {
								setStartTime(value)
							}}
							format={'HH:mm'}
						/>
						<TimePicker
							value={endTime}
							style={{ minWidth: '150px' }}
							onChange={(value: Dayjs) => {
								setEndTime(value)
							}}
							format={'HH:mm'}
						/>
					</Space>
				</Space>

				<Space direction={'vertical'} align={'end'}>
					<Space>
						<Select
							placeholder={'Departure airport'}
							value={airportDeparture?.airportId}
							options={airportSelectOptions}
							onChange={(_value: number, option: any) => {
								setAirportDeparture(option.data)
							}}
							style={{ width: '160px' }}
							popupMatchSelectWidth={false}
						/>
						<Select
							placeholder={'Arrival airport'}
							value={airportArrival?.airportId}
							options={airportSelectOptions}
							onChange={(_value: number, option: any) => {
								setAirportArrival(option.data)
							}}
							style={{ width: '160px' }}
							popupMatchSelectWidth={false}
						/>
					</Space>
					<Space>
						<span>Board type:</span>
						<AircraftTypeSelect/>
					</Space>
				</Space>

				{routeSelected ?
					<Space direction={'vertical'}>
						<Tooltip title={disableButtonReason}>
							<Button type={'primary'}
									icon={<EditOutlined/>}
									disabled={disableButtonReason !== null}
									onClick={handlerAddOrEditRoute}
									style={{ width: '160px' }}
							>Изменить перелет</Button>
						</Tooltip>
						<Button type={'primary'}
								danger
								icon={<DeleteOutlined/>}
								style={{ width: '160px' }}
								onClick={() => {
									if (routeSelected) {
										requestDeleteRouteFx(routeSelected.id)
									} else {
										showWarn('Перелет не выбраню')
									}
								}
								}
						>Удалить перелет</Button>
					</Space>
					:
					<Space direction={'vertical'}>
						<Tooltip title={disableButtonReason}>
							<Button type={'primary'} icon={<PlusOutlined/>} disabled={disableButtonReason !== null}
									onClick={handlerAddOrEditRoute} style={{ width: '160px' }}>Add route</Button>
						</Tooltip>

						<Button onClick={handlerGenerateRoute}
								style={{ width: '160px' }}
						>Generate route</Button>
					</Space>
				}
			</Space>
		</Space>
	)
}

export default RouteControl
