/**
 * @author Markitanov Vadim
 * @since 08.02.2025
 */
import { createStore, createEvent } from 'effector'
import dayjs, { Dayjs } from 'dayjs'
import type { RangeValueType } from 'rc-picker/lib/PickerInput/RangePicker'
import { createEffect } from 'effector/compat'
import { DateModel } from '../models/DateModel'
import { HOURS_IN_CELL } from '../utils/consts'
import { getWeekCount } from '../utils/utils'

export enum ZoomMode {
	WEEKS, // В ячейке по одному дню
	WEEK, // В ячейке пол дня
	DAY, // В ячейке четверть дня
}

interface CanvasStore {
	zoomMode: ZoomMode
	dateRange: RangeValueType<Dayjs>
}

const defaultState: CanvasStore = {
	zoomMode: ZoomMode.DAY,
	dateRange: [dayjs().startOf('day'), dayjs().add(1, 'days').startOf('day')]
}

export const zoomModeChanged = createEvent<ZoomMode>('Событие изменения масштабирования канвы.')
export const datesRangeChanged = createEvent<RangeValueType<Dayjs>>('Событие изменения периода.')

export const $canvas = createStore<CanvasStore>(defaultState)
$canvas.on(zoomModeChanged, (state, payload) => {
	return { ...state, zoomMode: payload }
})
$canvas.on(datesRangeChanged, (state, payload) => {
	return { ...state, dateRange: payload }
})

const updateDatesFx = createEffect<DateModel[], DateModel[]>()
export const $dates = createStore<DateModel[]>([])
	.on(updateDatesFx, (_state, payload) => payload)
$canvas.watch((state) => {
	if (state.dateRange && state.dateRange[0] && state.dateRange[1]) {
		const newStartDate:Dayjs = state.dateRange[0]
		const diffHours = state.dateRange[1].add(1, 'day').diff(newStartDate, 'hours') / HOURS_IN_CELL
		const newDates: DateModel[] = []
		for (let i = 0; i < diffHours; i++) {
			const newDate = newStartDate.add(i * HOURS_IN_CELL, 'hours')
			newDates.push({
				date: newDate, title: `(W${getWeekCount(newDate)})`
			})
		}

		console.log('newDates:', newDates)

		updateDatesFx(newDates)
	}
})
