/**
 * Компонент управлением перелетами.
 *
 * @author Markitanov Vadim
 * @since 23.11.2023
 */
import React, { JSX, useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { $routeSelect, routeAddFx, flightBoardIdChanged, routeDeleteFx } from '../../../store/route'
import { flightEditFx, $flights } from '../../../store/flight'
import { Dayjs } from 'dayjs'
import { Button, DatePicker, Divider, Input, Select, SelectProps, Space } from 'antd'
import { combineDateTime } from '../../../utils/utils'
import { toast } from 'react-toastify'
import { DATE_FORMAT } from '../../../utils/consts'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import type {RangeValueType} from 'rc-picker/lib/PickerInput/RangePicker'
import { Route } from '../../../models/Route'
import { RouteType } from '../../../models/RouteType'
import { $airports } from '../../../store/airport'
import { Price } from '../../../models/Price'
import { Currency } from '../../../models/Currency'

const RouteControl = (): JSX.Element => {
	const route = useStore($routeSelect)
	const flights = useStore($flights)
	const airports = useStore($airports)
	const [editRouteButtonDisable, setEditRouteButtonDisable] = useState<boolean>(true)
	const [flightId, setFlightId] = useState<number | undefined>()
	const [price, setPrice] = useState<Price | null>({ value: 0, currency: Currency.RUB })
	const [dateRangeValue, setDateRangeValue] = useState<RangeValueType<Dayjs> | null>(null)
	const [timeRangeValue, setTimeRangeValue] = useState<RangeValueType<Dayjs> | null>(null)
	const [airportStart, setAirportStart] = useState<string | undefined>()
	const [airportEnd, setAirportEnd] = useState<string | undefined>()

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
		setPrice(route ? route.price : null)

	}, [route])

	let flightOptions: SelectProps['options'] = []
	flights.forEach(flight=>{
		flightOptions?.push({value: flight.id, label: `Рейс ${flight.id}`})
	})

	let currencyOptions: SelectProps['options'] = []
	currencyOptions.push({ value: Currency.RUB, label: Currency.RUB })
	currencyOptions.push({ value: Currency.USD, label: Currency.USD })

	useEffect(() => {
		setEditRouteButtonDisable(flightId === undefined || dateRangeValue === null || timeRangeValue === null || airportStart === undefined || airportEnd === undefined)
	}, [flightId, dateRangeValue, timeRangeValue, airportStart, airportEnd])

	const handlerFlightSelectChange = (value: number | undefined): void => {
		setFlightId(value)
	}

	const handlerCurrencySelectChange = (currency: Currency): void => {
		if (price) {
			setPrice({ ...price, currency: currency })
		}
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
				scheduledDepartureDate: newStartDate,
				scheduledArrivalDate: newEndDate,
				type: RouteType.DEFAULT,
				airportStart: airportStart,
				airportEnd: airportEnd,
				price: price
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
		setPrice(null)
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
					const updatedFlight: Route = {
						...route,
						scheduledDepartureDate: newStartDate,
						scheduledArrivalDate: newEndDate,
						airportStart: airportStart,
						airportEnd: airportEnd,
						price: price
					}
					if (route.flightId === flightId) {
						flightEditFx(updatedFlight)
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
		return { label: airport.name, value: airport.iata }
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
							placeholder={'Вылет'}
							value={airportStart}
							options={airportSelectOptions}
							onChange={setAirportStart}
							style={{ width: '160px' }}
							popupMatchSelectWidth={false}
						/>
						<Select
							placeholder={'Прилет'}
							value={airportEnd}
							options={airportSelectOptions}
							onChange={setAirportEnd}
							style={{ width: '160px' }}
							popupMatchSelectWidth={false}
						/>
					</Space>
					<Space align={'center'}>
						<span>Стоимость:</span>
						<Input
							value={price?.value}
							type={'number'}
							onChange={(event) => {
								if (price) {
									setPrice({ ...price, value: event.target.value as unknown as number })
								}
							}
							}
							style={{ width: '130px' }}
							allowClear
						/>
						<Select placeholder={'Валюта'}
								value={price?.currency}
								options={currencyOptions}
								style={{ minWidth: '100px' }}
								onChange={handlerCurrencySelectChange}
								allowClear
						/>
					</Space>
				</Space>

				{route ?
					<Space direction={'vertical'}>
						<Button type={'primary'}
								icon={<EditOutlined/>}
								disabled={editRouteButtonDisable}
								onClick={handlerEditFlight}
								style={{ width: '160px' }}
						>Изменить перелета</Button>
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
							disabled={editRouteButtonDisable}
							onClick={handlerAddRoute}
							style={{ width: '160px' }}
					>Добавить перелет</Button>
				}


			</Space>
		</Space>
	)
}

export default RouteControl
