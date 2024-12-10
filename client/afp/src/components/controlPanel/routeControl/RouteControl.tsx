/**
 * Компонент добавления/изменения перелетов.
 *
 * @author Markitanov Vadim
 * @since 23.11.2023
 */
import React, { JSX, useEffect, useState, useCallback } from 'react'
import { useStore } from 'effector-react'
import { $routeSelected, routeAddOrSaveFx, routeDeleteFx, routeSelectUpdateFlightId } from '../../../store/route'
import { $flights, $flightSelected } from '../../../store/flight'
import dayjs, { Dayjs } from 'dayjs'
import { Button, DatePicker, Divider, Select, SelectProps, Space, Tooltip } from 'antd'
import { combineDateTime } from '../../../utils/utils'
import { getRandomNumber } from '../../../utils/math'
import { toast } from 'react-toastify'
import { DATE_FORMAT, LOCAL_MODE } from '../../../utils/consts'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import type { RangeValueType } from 'rc-picker/lib/PickerInput/RangePicker'
import { Route } from '../../../models/Route'
import { $airports } from '../../../store/airport'
import { $routeTypeDictStore } from '../../../store/dict'
import { DictDto } from '../../../models/dto/DictDto'
import AircraftTypeSelect from './AircraftTypeSelect'
import { fetchAirportsFx } from '../../../api/airport'
import { Airport } from '../../../models/Airport'
import { requestAddOrSaveRouteFx } from '../../../api/route'

const RouteControl = (): JSX.Element => {
	const routeSelected = useStore($routeSelected)
	const flightSelected = useStore($flightSelected)
	const flights = useStore($flights)
	const airports = useStore($airports)
	const routeTypes = useStore($routeTypeDictStore)

	const [flightId, setFlightId] = useState<number | undefined>()
	const [routeType, setRouteType] = useState<number | null>(null)
	const [dateRangeValue, setDateRangeValue] = useState<RangeValueType<Dayjs> | null>(null)
	const [timeRangeValue, setTimeRangeValue] = useState<RangeValueType<Dayjs> | null>(null)
	const [airportDeparture, setAirportDeparture] = useState<Airport | null>(null)
	const [airportArrival, setAirportArrival] = useState<Airport | null>(null)
	const [routeTypeOptions, setRouteTypeOptions] = useState<DictDto[]>([])

	const [title, setTitle] = useState<string>()
	const [disableButtonReason, setDisableButtonReason] = useState<string | null>('')

	useEffect(() => {
		if (!LOCAL_MODE) {
			fetchAirportsFx()
		}
	}, [])

	useEffect(() => {
		setFlightId(routeSelected?.flightId)

		if (routeSelected) {
			setTitle('Изменение перелета')
			setRouteType(routeSelected.routeTypeId)
			setDateRangeValue([routeSelected.scheduledDepartureDate, routeSelected.scheduledArrivalDate])
			setTimeRangeValue([routeSelected.scheduledDepartureDate, routeSelected.scheduledArrivalDate])
			setAirportDeparture({
				airportId: routeSelected.aptDepartId,
				iata: routeSelected.aptDeptIata,
				icao: routeSelected.aptDeptIcao,
				airportName: routeSelected.aptDeptName
			})

			setAirportArrival({
				airportId: routeSelected.aptArrId,
				iata: routeSelected.aptArrIata,
				icao: routeSelected.aptArrIcao,
				airportName: routeSelected.aptArrName
			})
		} else {
			setTitle('Добавление перелета')
			resetData()
		}

	}, [routeSelected])

	useEffect(() => {
		if (routeTypes.length !== 0) {
			setRouteTypeOptions(routeTypes)
			setRouteType(routeTypes[1].value)
		}
	}, [routeTypes])

	useEffect(() => {
		setFlightId(flightSelected !== null ? flightSelected.id : undefined)
	}, [flightSelected])

	const resetData = (): void => {
		setDateRangeValue(null)
		setRouteType(null)
		setTimeRangeValue(null)
		setAirportDeparture(null)
		setAirportArrival(null)
	}

	let flightOptions: SelectProps['options'] = []
	flights.forEach(flight => {
		flightOptions?.push({ value: flight.id, label: `Рейс ${flight.id}` })
	})

	const handlerFlightSelectChange = (value: number | undefined): void => {
		setFlightId(value)
	}

	const getDisableButtonReason = useCallback((): string | null => {
		if (flightId === undefined) return 'Выберите рейс перелета'
		if (routeType === null) return 'Выберите тип перелета'
		if (dateRangeValue === null) return 'Выберите даты'
		if (timeRangeValue === null) return 'Выберите время'
		if (airportDeparture === null) return 'Выберите аэропорт вылета'
		if (airportArrival === null) return 'Выберите прилета вылета'
		return null
	}, [flightId, routeType, dateRangeValue, timeRangeValue, airportDeparture, airportArrival])

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

		// @ts-ignore
		const newStartDate: Dayjs = combineDateTime(dateRangeValue[0], timeRangeValue[0])
		// @ts-ignore
		const newEndDate: Dayjs = combineDateTime(dateRangeValue[1], timeRangeValue[1])

		if (newStartDate.isAfter(newEndDate)) {
			toast.warn('Время вылета превышает или совпадает с временем прилета.')
			return
		}

		const newRoute: Route = {
			id: routeSelected ? routeSelected.id : -1,
			flightId: flightId as number,
			routeTypeId: routeType as number,
			scheduledDepartureDate: newStartDate,
			scheduledArrivalDate: newEndDate,
			aptDepartId: (airportDeparture as Airport).airportId,
			aptDeptIata: (airportDeparture as Airport).iata,
			aptDeptIcao: (airportDeparture as Airport).icao,
			aptDeptName: (airportDeparture as Airport).airportName,

			aptArrId: (airportArrival as Airport).airportId,
			aptArrIata: (airportArrival as Airport).iata,
			aptArrIcao: (airportArrival as Airport).icao,
			aptArrName: (airportArrival as Airport).airportName
		}

		if (LOCAL_MODE) {
			routeAddOrSaveFx({ route: newRoute, oldFlightId: routeSelected?.flightId })
			if (routeSelected?.routeTypeId !== flightId) {
				if (flightId !== undefined) {
					routeSelectUpdateFlightId(flightId)
				}
			}
		} else {
			if (routeSelected) {
				requestAddOrSaveRouteFx(newRoute)
			} else {
				requestAddOrSaveRouteFx(newRoute)
			}
		}

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
		setFlightId(flights[getRandomNumber(0, flights.length)].id)
		setRouteType(routeTypes[getRandomNumber(0, routeTypes.length)].value)
		const scheduledDepartureDate = dayjs().startOf('day').add(0, 'hours')
		const scheduledArrivalDate = dayjs().startOf('day').add(6, 'hours')
		setDateRangeValue([scheduledDepartureDate, scheduledArrivalDate])
		setTimeRangeValue([scheduledDepartureDate, scheduledArrivalDate])
		setAirportDeparture(airports[getRandomNumber(0, airports.length)])
		setAirportArrival(airports[getRandomNumber(0, airports.length)])
	}

	return (
		<Space direction={'vertical'}>
			<Divider type={'horizontal'}
					 orientation={'left'}
					 className={'control-panel-divider'}>{title}</Divider>
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
							value={airportDeparture?.airportId}
							options={airportSelectOptions}
							onChange={(_value: number, option: any) => {
								setAirportDeparture(option.data)
							}}
							style={{ width: '160px' }}
							popupMatchSelectWidth={false}
						/>
						<Select
							placeholder={'Аэропорт прилета'}
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
						<span>Тип борта:</span>
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
									routeDeleteFx(routeSelected)
								}}
						>Удалить перелет</Button>
					</Space>
					:
					<Space direction={'vertical'}>
						<Tooltip title={disableButtonReason}>
							<Button type={'primary'} icon={<PlusOutlined/>} disabled={disableButtonReason !== null}
									onClick={handlerAddOrEditRoute} style={{ width: '160px' }}>Добавить перелет</Button>
						</Tooltip>

						<Button onClick={handlerGenerateRoute}
								style={{ width: '160px' }}
						>Генерировать перелет</Button>
					</Space>
				}
			</Space>
		</Space>
	)
}

export default RouteControl
