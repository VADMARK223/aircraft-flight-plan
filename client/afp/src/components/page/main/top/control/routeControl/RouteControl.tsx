/**
 * Компонент добавления/изменения перелетов.
 *
 * @author Markitanov Vadim
 * @since 23.11.2023
 */
import React, { JSX, useEffect, useState, useCallback } from 'react'
import { useStore } from 'effector-react'
import { $routeSelected } from '../../../../../../store/route'
import { $flights, $flightSelected } from '../../../../../../store/flight'
import dayjs, { Dayjs } from 'dayjs'
import { Button, DatePicker, Divider, Select, SelectProps, Space, Tooltip, TimePicker } from 'antd'
import { combineDateTime } from '../../../../../../utils/utils'
import { getRandomNumber } from '../../../../../../utils/math'
import { toast } from 'react-toastify'
import { DATE_FORMAT } from '../../../../../../utils/consts'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import type { RangeValueType } from 'rc-picker/lib/PickerInput/RangePicker'
import { Route } from '../../../../../../models/Route'
import { $airports } from '../../../../../../store/airport'
import { $routeTypeDictStore } from '../../../../../../store/dict'
import { DictData } from '../../../../../../models/DictData'
import AircraftTypeSelect from './AircraftTypeSelect'
import { fetchAirportsFx } from '../../../../../../api/airport'
import { Airport } from '../../../../../../models/Airport'
import { requestAddOrSaveRouteFx, requestDeleteRouteFx } from '../../../../../../api/route'
import { showWarn } from '../../../../../../api/common'

const RouteControl = (): JSX.Element => {
	const routeSelected = useStore($routeSelected)
	const flightSelected = useStore($flightSelected)
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
		setFlightId(routeSelected?.flightId)

		if (routeSelected) {
			setTitle('Изменение перелета')
			setRouteType(routeSelected.routeTypeId)
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

		if (newStartDate.isAfter(newEndDate)) {
			toast.warn('Время вылета превышает или совпадает с временем прилета.')
			return
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
			setFlightId(flights[getRandomNumber(0, flights.length)].id)
		}
		setRouteType(routeTypes[getRandomNumber(0, routeTypes.length)].value)
		const scheduledDepartureDate = dayjs().startOf('day').add(0, 'hours')
		const scheduledArrivalDate = dayjs().startOf('day').add(6, 'hours')
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
					<Space size={0}>
						<span>Время:</span>
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
									if (routeSelected) {
										if (routeSelected.id != null) {
											requestDeleteRouteFx(routeSelected.id)
										} else {
											showWarn('У удаляемого перелета пустой идентификатор.')
										}
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
									onClick={handlerAddOrEditRoute} style={{ width: '160px' }}>Добавить
								перелет</Button>
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
