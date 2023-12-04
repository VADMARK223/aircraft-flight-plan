import dayjs, { Dayjs } from 'dayjs'
import { BOARD_ITEM_WIDTH, DATE_ITEM_WIDTH, MINUTES_IN_CELL } from './consts'
import type { RangeValue } from 'rc-picker/lib/interface'

/**
 * @author Markitanov Vadim
 * @since 23.11.2023
 */
export const getWeekCount = (current: dayjs.Dayjs): number => {
	const startOfYear = dayjs().startOf('year')
	return current.diff(startOfYear, 'weeks')
}

export const drawLine = (svg: any, x1: number, y1: number, x2: number, y2: number): any => {
	const result = svg.append('line')
	result.attr('stroke', 'black')
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

export const appendRotateText = (svg: any, translateX: number, translateY: number, text: string, rotate: number, dominantBaseline: string = 'auto') => {
	const endDateContainer = svg.append('g')
	endDateContainer.attr('transform', `translate(${translateX},${translateY})`)
	endDateContainer.append('text')
		.attr('font-size', 12)
		.attr('fill', 'black')
		.attr('transform', `rotate(${rotate})`)
		.attr('dominant-baseline', dominantBaseline)
		.text(text)
}

export const dateToX = (date: dayjs.Dayjs): number => {
	const startDay = dayjs().startOf('day')
	return BOARD_ITEM_WIDTH + DATE_ITEM_WIDTH / MINUTES_IN_CELL * date.diff(startDay, 'minutes')
}

export const dateToNew = (datesRange: RangeValue<Dayjs>, date: Dayjs): number => {
	if (datesRange === null) {
		throw new Error('Dates range is null')
	}

	const startDay = datesRange[0]
	return BOARD_ITEM_WIDTH + DATE_ITEM_WIDTH / MINUTES_IN_CELL * date.diff(startDay, 'minutes')
}

export const xToDate = (x: number): dayjs.Dayjs => {
	const newStartX = x - BOARD_ITEM_WIDTH
	const newStartMinutes = newStartX * MINUTES_IN_CELL / DATE_ITEM_WIDTH
	return dayjs().startOf('day').add(newStartMinutes, 'minutes')
}

export /**
 * Метод объединяет объект даты и объект времени в одну временную метку.
 * @param {dayjs.Dayjs | null} date - дата для объединения.
 * @param {dayjs.Dayjs | null} time - время для объединения.
 * @returns {dayjs.Dayjs} результатирующая дата.
 */
const combineDateTime = (date: Dayjs | null, time: Dayjs | null): Dayjs => {
	if (date === null || time === null) {
		throw new Error('Wrong date or time.')
	}
	return dayjs()
		.set('year', date.year())
		.set('month', date.month())
		.set('day', date.day())
		.set('hour', time.hour())
		.set('minute', time.minute())
}

/*
export const generateDates = (): DateModel[] => {
	const startDate = dayjs().startOf('day')
	const result: DateModel[] = []
	for (let i = 0; i < 8; i++) {
		const newDate = startDate.add(i * HOURS_IN_CELL, 'hours')
		result.push({
			date: newDate,
			title: `(Н${getWeekCount(newDate)} / ${Math.floor(Math.random() * 1000)})`
		})
	}

	return result
}*/
