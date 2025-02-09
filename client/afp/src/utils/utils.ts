import dayjs, { Dayjs } from 'dayjs'

/**
 * @author Markitanov Vadim
 * @since 23.11.2023
 */
export const LOCAL_TIME_ZONE: string = Intl.DateTimeFormat().resolvedOptions().timeZone
const OFFSET_HOURS = -(new Date().getTimezoneOffset() / 60)
export const FORMATTED_OFFSET = `GMT${OFFSET_HOURS >= 0 ? '+' : ''}${OFFSET_HOURS}:00`

export const getWeekCount = (current: dayjs.Dayjs): number => {
	const startOfYear = dayjs().startOf('year')
	return current.diff(startOfYear, 'weeks')
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

export const drawTopText = (svg: any, text: string, x: number, y: number, cursor: string, textColor: string): any => {
	svg.append('text')
		.attr('x', x)
		.attr('y', y - 3)
		.attr('fill', textColor)
		.attr('text-anchor', 'middle')
		.attr('dominant-baseline', 'baseline')
		.attr('cursor', cursor)
		.style('user-select', 'none')
		.text(text)
}

export const drawTextRotate = (svg: any, text: string, x: number, y: number, cursor: string): any => {
	svg.append('text')
		.attr('x', x)
		.attr('y', y)
		.attr('font-size', 12)
		.attr('fill', 'black')
		.attr('font-weight', 'bold')
		.attr('text-anchor', 'middle')
		.attr('dominant-baseline', 'middle')
		.attr('transform', `rotate(-90, ${x}, ${y})`)
		.attr('cursor', cursor)
		.style('user-select', 'none')
		.text(text)
}

export const drawAirportText = (svg: any, textColor: string, text: string, x: number, y: number, textAnchor: 'start' | 'end'): any => {
	const result = svg.append('text')
	result.attr('x', x)
	result.attr('y', y)
	result.attr('font-size', 12)
	result.attr('font-weight', 'bold')
	result.attr('fill', textColor)
	result.attr('text-anchor', textAnchor)
	result.attr('dominant-baseline', 'hanging')
	result.text(text)
	result.style('user-select', 'none')
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

/*const checkDates = (start: Dayjs, end: Dayjs): string | undefined => {
	if (start.isSame(end, 'day')) {
		// Даты совпадают, сравниваем время.
		if (!end.isAfter(start, 'minute')) {
			toast.warn('Время вылета превышает дату прилета.')
		} else {
			toast.success('Все хорошо.')
		}
	} else {
		// Даты не совпадают, проверяем, чтобы финишная дата не была раньше стартовой.
		if (end.isAfter(start, 'day')) {
			toast.warn('Дата вылета превышает дату прилета.')
		} else {
			toast.success('Все хорошо.')
		}
	}

	return 'asd'
}*/

export const getDayNameByCount = (count: number): string => {
	switch (count) {
		case 0:
			return 'Sunday'
		case 1:
			return 'Monday'
		case 2:
			return 'Tuesday'
		case 3:
			return 'Wednesday'
		case 4:
			return 'Thursday'
		case 5:
			return 'Friday'
		case 6:
			return 'Saturday'

		default:
			return 'Unknown'
	}
}


