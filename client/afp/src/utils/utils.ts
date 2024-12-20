import dayjs, { Dayjs } from 'dayjs'
import { FLIGHT_CELL_WIDTH, DATE_ITEM_WIDTH, MINUTES_IN_CELL } from './consts'
import type { RangeValueType } from 'rc-picker/lib/PickerInput/RangePicker'

/**
 * @author Markitanov Vadim
 * @since 23.11.2023
 */
export const USER_TIME_ZONE: string = Intl.DateTimeFormat().resolvedOptions().timeZone
const OFFSET_HOURS = -(new Date().getTimezoneOffset() / 60)
export const FORMATTED_OFFSET = `GMT${OFFSET_HOURS >= 0 ? '+' : ''}${OFFSET_HOURS}:00`

export const getWeekCount = (current: dayjs.Dayjs): number => {
	const startOfYear = dayjs().startOf('year')
	return current.diff(startOfYear, 'weeks')
}

export const drawLine = (svg: any, lineColor: string, x1: number, y1: number, x2: number, y2: number): any => {
	const result = svg.append('line')
	result.attr('stroke', lineColor)
	result.attr('stroke-width', 3)
	result.attr('x1', x1)
	result.attr('y1', y1)
	result.attr('x2', x2)
	result.attr('y2', y2)
	return result
}
export const drawRect = (svg: any, x: number, y: number, width: number, height: number, stroke: string, fill: string, cursor: string): any => {
	const result = svg.append('rect')
	result.attr('x', x)
	result.attr('y', y)
	result.attr('width', width)
	result.attr('height', height)
	result.attr('stroke', stroke)
	result.attr('fill', fill)
	result.attr('cursor', cursor)
	return result
}

export const drawText = (svg: any, text: string, x: number, y: number, cursor: string): any => {
	svg.append('text')
		.attr('x', x)
		.attr('y', y)
		.attr('fill', 'black')
		.attr('font-weight', 'bold')
		.attr('text-anchor', 'middle')
		.attr('dominant-baseline', 'middle')
		.attr('cursor', cursor)
		.text(text)
}

export const drawAirportText = (svg: any, text: string, x: number, y: number): any => {
	const result = svg.append('text')
	result.attr('x', x)
	result.attr('y', y)
	result.attr('font-size', 11)
	result.attr('fill', 'white')
	result.attr('text-anchor', 'start')
	result.attr('dominant-baseline', 'hanging')
	result.text(text)
	return result
}

export const appendRotateText = (svg: any, textColor: string, translateX: number, translateY: number, text: string, rotate: number, dominantBaseline = 'auto') => {
	const endDateContainer = svg.append('g')
	endDateContainer.attr('transform', `translate(${translateX},${translateY})`)
	endDateContainer.append('text')
		.attr('font-size', 12)
		.attr('fill', textColor)
		.attr('transform', `rotate(${rotate})`)
		.attr('dominant-baseline', dominantBaseline)
		.text(text)
}

export const dateToX = (date: dayjs.Dayjs): number => {
	const startDay = dayjs().startOf('day')
	return FLIGHT_CELL_WIDTH + DATE_ITEM_WIDTH / MINUTES_IN_CELL * date.diff(startDay, 'minutes')
}

export const dateToNew = (datesRange: RangeValueType<Dayjs>, date: Dayjs): number => {
	if (datesRange === null) {
		throw new Error('Dates range is null')
	}

	const startDay = datesRange[0]
	return FLIGHT_CELL_WIDTH + DATE_ITEM_WIDTH / MINUTES_IN_CELL * date.diff(startDay, 'minutes')
}

export const xToDate = (x: number): dayjs.Dayjs => {
	const newStartX = x - FLIGHT_CELL_WIDTH
	const newStartMinutes = newStartX * MINUTES_IN_CELL / DATE_ITEM_WIDTH
	return dayjs().startOf('day').add(newStartMinutes, 'minutes')
}

export /**
 * Метод объединяет объект даты и объект времени в одну временную метку.
 * @param {dayjs.Dayjs | null} date - дата для объединения.
 * @param {dayjs.Dayjs | null} time - время для объединения.
 * @returns {dayjs.Dayjs} дата.
 */
const combineDateTime = (date: Dayjs | null | undefined, time: Dayjs | null | undefined): Dayjs => {
	if (date === null || date === undefined || time === null || time === undefined) {
		throw new Error('Wrong date or time.')
	}
	return dayjs()
		.set('year', date.year())
		.set('month', date.month())
		.set('day', date.day())
		.set('hour', time.hour())
		.set('minute', time.minute())
}

export const getDayNameByCount = (count: number): string => {
	switch (count) {
		case 0:
			return 'Понедельник'
		case 1:
			return 'Вторник'
		case 2:
			return 'Среда'
		case 3:
			return 'Четверг'
		case 4:
			return 'Пятница'
		case 5:
			return 'Суббота'
		case 6:
			return 'Воскресенье'
		default:
			return 'Неизвестно'
	}
}

