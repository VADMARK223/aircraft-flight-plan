/**
 * Компонент управлением полетвами.
 *
 * @author Markitanov Vadim
 * @since 23.11.2023
 */
import React, { JSX, useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { $flightsSelect, flightAddFx, flightBoardIdChanged, flightDeleteFx } from '../../../store/route'
import { $flights, flightEditFx } from '../../../store/board'
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
	const flight = useStore($flightsSelect)
	const boards = useStore($flights)
	const airports = useStore($airports)
	const [editFlightButtonDisable, setEditFlightButtonDisable] = useState<boolean>(true)
	const [boardId, setBoardId] = useState<number | undefined>()
	const [flightId, setFlightId] = useState<string | undefined>()
	const [price, setPrice] = useState<Price | null>({ value: 0, currency: Currency.RUB })
	const [dateRangeValue, setDateRangeValue] = useState<RangeValueType<Dayjs> | null>(null)
	const [timeRangeValue, setTimeRangeValue] = useState<RangeValueType<Dayjs> | null>(null)
	const [airportStart, setAirportStart] = useState<string | undefined>()
	const [airportEnd, setAirportEnd] = useState<string | undefined>()

	useEffect(() => {
		setBoardId(flight?.boardId)
		setFlightId(flight?.id)
		setAirportStart(flight?.airportStart)
		setAirportEnd(flight?.airportEnd)
		if (flight) {
			setDateRangeValue([flight.startDate, flight.endDate])
			setTimeRangeValue([flight.startDate, flight.endDate])
		} else {
			setDateRangeValue(null)
			setTimeRangeValue(null)
		}
		setPrice(flight ? flight.price : null)

	}, [flight])

	let boardOptions: SelectProps['options'] = []
	boards.forEach(value => {
		boardOptions?.push({ value: value.id, label: value.name })
	})

	let currencyOptions: SelectProps['options'] = []
	currencyOptions.push({ value: Currency.RUB, label: Currency.RUB })
	currencyOptions.push({ value: Currency.USD, label: Currency.USD })
	// boards.forEach(value => {
	// 	currencyOptions?.push({ value: value.id, label: value.name })
	// })

	useEffect(() => {
		setEditFlightButtonDisable(boardId === undefined || flightId === undefined || flightId === '' || dateRangeValue === null || timeRangeValue === null || airportStart === undefined || airportEnd === undefined)
	}, [boardId, flightId, dateRangeValue, timeRangeValue, airportStart, airportEnd])

	const handlerBoardSelectChange = (value: number | undefined): void => {
		setBoardId(value)
	}

	const handlerCurrencySelectChange = (currency: Currency): void => {
		if (price) {
			setPrice({ ...price, currency: currency })
		}
	}

	/**
	 * Метод подтверждения добавления полета.
	 */
	const handlerAddFlight = (): void => {
		if (boardId === undefined || dateRangeValue === null || timeRangeValue === null || airportStart === undefined || airportEnd === undefined) {
			return
		}

		const newStartDate: Dayjs = combineDateTime(dateRangeValue[0], timeRangeValue[0])
		const newEndDate: Dayjs = combineDateTime(dateRangeValue[1], timeRangeValue[1])

		if (flightId === undefined || flightId === '') {
			return
		}
		if (newStartDate.isBefore(newEndDate)) {
			const newFlight: Route = {
				id: flightId,
				boardId: boardId,
				startDate: newStartDate,
				endDate: newEndDate,
				type: RouteType.DEFAULT,
				airportStart: airportStart,
				airportEnd: airportEnd,
				price: price
			}

			flightAddFx(newFlight)
		} else {
			toast.warn('Время вылета превышает или совпадает с временем прилета.')
		}

		setBoardId(undefined)
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
				if (flightId !== undefined && flightId !== '' && boardId && flight && airportStart && airportEnd) {
					const updatedFlight: Route = {
						...flight,
						startDate: newStartDate,
						endDate: newEndDate,
						airportStart: airportStart,
						airportEnd: airportEnd,
						price: price
					}
					if (flight.boardId === boardId) {
						flightEditFx(updatedFlight)
					} else {
						flightDeleteFx(flight)
						flightBoardIdChanged(boardId)
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
					 className={'control-panel-divider'}>Изменение полета</Divider>
			<Space align={'start'}>
				<Space direction={'vertical'} align={'end'}>
					<Space>
						<span>Борт:</span>
						<Select placeholder={'Выберите борт'}
								value={boardId}
								options={boardOptions}
								style={{ minWidth: '150px' }}
								onChange={handlerBoardSelectChange}
								allowClear
								showSearch
								filterOption={(input, opt) => {
									return (opt?.label !== null && opt?.label !== undefined ? JSON.stringify(opt.label).toLowerCase().includes(input.toLowerCase()) : true)
								}}
						/>
					</Space>
					<Space>
						<span>Полет:</span>
						<Input
							value={flightId}
							onChange={(event) => {
								setFlightId(event.target.value)
							}}
							style={{ width: '150px' }}
							allowClear
							disabled={flight !== null}
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

				{flight ?
					<Space direction={'vertical'}>
						<Button type={'primary'}
								icon={<EditOutlined/>}
								disabled={editFlightButtonDisable}
								onClick={handlerEditFlight}
								style={{ width: '160px' }}
						>Изменить полет</Button>
						<Button type={'primary'}
								danger
								icon={<DeleteOutlined/>}
								style={{ width: '160px' }}
								onClick={() => {
									flightDeleteFx(flight)
									// flightSelectReset()
								}}
						>Удалить полет</Button>
					</Space>
					:
					<Button type={'primary'}
							icon={<PlusOutlined/>}
							disabled={editFlightButtonDisable}
							onClick={handlerAddFlight}
							style={{ width: '160px' }}
					>Добавить полет</Button>
				}


			</Space>
		</Space>
	)
}

export default RouteControl
