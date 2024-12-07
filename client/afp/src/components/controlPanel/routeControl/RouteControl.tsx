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
	// const [aptDeptIata, setAptDeptIata] = useState<string | undefined>()
	const [airportDeparture, setAirportDeparture] = useState<Airport | null>(null)
	const [aptArrIata, setAptArrIata] = useState<string | undefined>()
	const [routeTypeOptions, setRouteTypeOptions] = useState<DictDto[]>([])

	useEffect(() => {
		if (!LOCAL_MODE) {
			fetchAirportsFx()
		}
	}, [])

	useEffect(() => {
		setFlightId(route?.flightId)

		setAptArrIata(route?.aptArrIata)
		if (route) {
			setAirportDeparture({
				airportId: route.aptDepartId,
				iata: route.aptDeptIata,
				icao: route.aptDeptIcao,
				airportName: route.aptDeptName
			})
			setDateRangeValue([route.scheduledDepartureDate, route.scheduledArrivalDate])
			setTimeRangeValue([route.scheduledDepartureDate, route.scheduledArrivalDate])
		} else {
			setDateRangeValue(null)
			setTimeRangeValue(null)
			setAirportDeparture(null)
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
		setDoneButtonDisable(flightId === undefined || dateRangeValue === null || timeRangeValue === null || airportDeparture === null || aptArrIata === undefined)
	}, [flightId, dateRangeValue, timeRangeValue, airportDeparture, aptArrIata])

	const handlerFlightSelectChange = (value: number | undefined): void => {
		setFlightId(value)
	}

	/**
	 * Метод подтверждения добавления перелета.
	 */
	const handlerAddRoute = (): void => {
		if (flightId === undefined || dateRangeValue === null || timeRangeValue === null || airportDeparture === null || aptArrIata === undefined) {
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
				aptDeptIata: airportDeparture.iata,
				aptArrIata: aptArrIata
			}

			routeAddFx(newRoute)
		} else {
			toast.warn('Время вылета превышает или совпадает с временем прилета.')
		}

		setFlightId(undefined)
		setDateRangeValue(null)
		setTimeRangeValue(null)
		setAirportDeparture(null)
		setAptArrIata(undefined)
	}

	/**
	 * Метод подтверждения изменения полета.
	 */
	const handlerEditFlight = (): void => {
		if (dateRangeValue != null && timeRangeValue != null) {
			const newStartDate: Dayjs = combineDateTime(dateRangeValue[0], timeRangeValue[0])
			const newEndDate: Dayjs = combineDateTime(dateRangeValue[1], timeRangeValue[1])
			if (newStartDate.isBefore(newEndDate)) {
				if (flightId && route && airportDeparture && aptArrIata) {
					const updatedRoute: Route = {
						...route,
						scheduledDepartureDate: newStartDate,
						scheduledArrivalDate: newEndDate,
						aptDeptIata: airportDeparture.iata,
						aptArrIata: aptArrIata
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
		return { value: airport.airportId,
			label: `${airport.airportName} (${airport.iata})`,
			data: airport
		}
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
							value={airportDeparture?.airportId}
							options={airportSelectOptions}
							onChange={(value: number, option: any) => {
								console.log('Dept:', option.data)
								setAirportDeparture(option.data)
							}}
							style={{ width: '160px' }}
							popupMatchSelectWidth={false}
						/>
						<Select
							placeholder={'Аэропорт прилета'}
							value={aptArrIata}
							options={airportSelectOptions}
							onChange={setAptArrIata}
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
