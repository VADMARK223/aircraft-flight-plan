/**
 * Компонент добавления/изменения перелетов.
 *
 * @author Markitanov Vadim
 * @since 23.11.2023
 */
import React, { JSX, useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { routeEditFx,$routeSelected, routeAddFx, flightBoardIdChanged, routeDeleteFx } from '../../../store/route'
import { $flights, $flightSelected } from '../../../store/flight'
import { Dayjs } from 'dayjs'
import { Button, DatePicker, Divider, Select, SelectProps, Space } from 'antd'
import { combineDateTime } from '../../../utils/utils'
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

	const [title, setTitle] = useState<string>()
	const [addButtonDisable, setAddButtonDisable] = useState<boolean>(true)
	const [flightId, setFlightId] = useState<number | undefined>()
	const [routeType, setRouteType] = useState<number | null>(null)
	const [dateRangeValue, setDateRangeValue] = useState<RangeValueType<Dayjs> | null>(null)
	const [timeRangeValue, setTimeRangeValue] = useState<RangeValueType<Dayjs> | null>(null)
	const [airportDeparture, setAirportDeparture] = useState<Airport | null>(null)
	const [airportArrival, setAirportArrival] = useState<Airport | null>(null)
	const [routeTypeOptions, setRouteTypeOptions] = useState<DictDto[]>([])

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
			setDateRangeValue(null)
			setRouteType(null)
			setTimeRangeValue(null)
			setAirportDeparture(null)
			setAirportArrival(null)
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

	let flightOptions: SelectProps['options'] = []
	flights.forEach(flight => {
		flightOptions?.push({ value: flight.id, label: `Рейс ${flight.id}` })
	})

	useEffect(() => {
		setAddButtonDisable(flightId === undefined || dateRangeValue === null || timeRangeValue === null || airportDeparture === null || airportArrival === null)
	}, [flightId, dateRangeValue, timeRangeValue, airportDeparture, airportArrival])

	const handlerFlightSelectChange = (value: number | undefined): void => {
		setFlightId(value)
	}

	/**
	 * Метод подтверждения добавления перелета.
	 */
	const handlerAddRoute = (): void => {
		if (flightId === undefined || dateRangeValue === null || timeRangeValue === null || airportDeparture === null || airportArrival === null) {
			return
		}

		const newStartDate: Dayjs = combineDateTime(dateRangeValue[0], timeRangeValue[0])
		const newEndDate: Dayjs = combineDateTime(dateRangeValue[1], timeRangeValue[1])

		console.log('newStartDate:', newStartDate)
		console.log('newEndDate:', newEndDate)
		if (newStartDate.isBefore(newEndDate)) {
			console.log('routeType:', routeType)
			if (routeType === null) {
				toast.warn('Выберите тип перелета.')
				return
			}
			const newRoute: Route = {
				id: -1,
				flightId: flightId,
				routeTypeId: routeType,
				scheduledDepartureDate: newStartDate,
				scheduledArrivalDate: newEndDate,
				aptDepartId: airportDeparture.airportId,
				aptDeptIata: airportDeparture.iata,
				aptDeptIcao: airportDeparture.icao,
				aptDeptName: airportDeparture.airportName,

				aptArrId: airportArrival.airportId,
				aptArrIata: airportArrival.iata,
				aptArrIcao: airportArrival.icao,
				aptArrName: airportArrival.airportName
			}
			if (LOCAL_MODE) {
				routeAddFx(newRoute)
			} else {
				requestAddOrSaveRouteFx(newRoute)
			}

			setFlightId(undefined)
			setDateRangeValue(null)
			setTimeRangeValue(null)
			setAirportDeparture(null)
			setAirportArrival(null)
		} else {
			toast.warn('Время вылета превышает или совпадает с временем прилета.')
		}
	}

	/**
	 * Метод подтверждения изменения полета.
	 */
	const handlerEditFlight = (): void => {
		if (dateRangeValue != null && timeRangeValue != null) {
			const newStartDate: Dayjs = combineDateTime(dateRangeValue[0], timeRangeValue[0])
			const newEndDate: Dayjs = combineDateTime(dateRangeValue[1], timeRangeValue[1])
			if (newStartDate.isBefore(newEndDate)) {
				if (flightId && routeSelected && airportDeparture && airportArrival) {
					const updatedRoute: Route = {
						...routeSelected,
						scheduledDepartureDate: newStartDate,
						scheduledArrivalDate: newEndDate,
						aptDepartId: airportDeparture.airportId,
						aptDeptIata: airportDeparture.iata,
						aptDeptIcao: airportDeparture.icao,
						aptDeptName: airportDeparture.airportName,

						aptArrId: airportArrival.airportId,
						aptArrIata: airportArrival.iata,
						aptArrIcao: airportArrival.icao,
						aptArrName: airportArrival.airportName
					}
					if (routeSelected.flightId === flightId) {
						if (LOCAL_MODE) {
							routeEditFx(updatedRoute)
						} else {
							console.log('Updated route:', updatedRoute)
							requestAddOrSaveRouteFx(updatedRoute)
						}
					} else {
						routeDeleteFx(routeSelected)
						flightBoardIdChanged(flightId)
					}
				}
			} else {
				toast.warn('Время вылета превышает или совпадает с временем прилета.')
			}
		}
	}

	const airportSelectOptions: SelectProps<Airport>['options'] = airports.map(airport => {
		return {
			value: airport.airportId,
			label: `${airport.airportName} (${airport.iata})`,
			data: airport
		}
	})

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
						<Button type={'primary'}
								icon={<EditOutlined/>}
								disabled={addButtonDisable}
								onClick={handlerEditFlight}
								style={{ width: '160px' }}
						>Изменить перелет</Button>
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
					<Button type={'primary'}
							icon={<PlusOutlined/>}
							disabled={addButtonDisable}
							onClick={handlerAddRoute}
							style={{ width: '160px' }}
					>Добавить перелет</Button>
				}


			</Space>
		</Space>
	)
}

export default RouteControl
