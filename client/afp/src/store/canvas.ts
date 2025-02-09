/**
 * Хранилище данных канвы.
 *
 * @author Markitanov Vadim
 * @since 08.02.2025
 */
import { createStore, createEvent } from 'effector'
import dayjs, { Dayjs } from 'dayjs'
import type { RangeValueType } from 'rc-picker/lib/PickerInput/RangePicker'
import { DateModel } from '../models/DateModel'
import { getWeekCount } from '../utils/utils'

export enum ZoomMode {
	WEEKS, // В ячейке по одному дню
	WEEK, // В ячейке пол дня
	DAY, // В ячейке четверть дня
}

interface CanvasStore {
	zoomMode: ZoomMode
	dateRange: RangeValueType<Dayjs>
	dates: DateModel[],
	hoursInCell: number // Сколько часов в ячейке на канве
}

const defaultState: CanvasStore = {
	zoomMode: ZoomMode.DAY,
	dateRange: [dayjs().startOf('day'), dayjs().add(1, 'days').startOf('day')],
	dates: [],
	/**
	 * 6 - для Day
	 * 12 - для Week
	 * 24 - для Days
	 * @type {number}
	 */
	hoursInCell: 6
}

export const zoomModeChanged = createEvent<ZoomMode>('Событие изменения масштабирования канвы.')
export const datesRangeChanged = createEvent<RangeValueType<Dayjs>>('Событие изменения периода.')

export const $canvas = createStore<CanvasStore>(defaultState)
$canvas.on(zoomModeChanged, (state, payload) => {
	return { ...state, zoomMode: payload }
})
$canvas.on(datesRangeChanged, (state, datesRange) => {
	const newDates: DateModel[] = []
	if (datesRange && datesRange[0] && datesRange[1]) {
		const newStartDate: Dayjs = datesRange[0]
		const diffHours = datesRange[1].add(1, 'day').diff(newStartDate, 'hours') / state.hoursInCell
		for (let i = 0; i < diffHours; i++) {
			const newDate = newStartDate.add(i * state.hoursInCell, 'hours')
			newDates.push({
				date: newDate, title: `(W${getWeekCount(newDate)})`
			})
		}
	}

	return { ...state, dateRange: datesRange, dates: newDates }
})
