/**
 * @author Markitanov Vadim
 * @since 04.12.2023
 */
import { createStore } from 'effector'
import type {RangeValueType} from 'rc-picker/lib/PickerInput/RangePicker'
import dayjs, { Dayjs } from 'dayjs'
import { createEffect } from 'effector/compat'
import { getWeekCount } from '../utils/utils'
import { HOURS_IN_CELL } from '../utils/consts'
import { DateModel } from '../models/DateModel'

const updateDatesFx = createEffect<DateModel[], DateModel[]>()
export const $dates = createStore<DateModel[]>([])
	.on(updateDatesFx, (state, payload) => payload)

export const updateDatesRangeFx = createEffect<RangeValueType<Dayjs>, RangeValueType<Dayjs>>()
export const $datesRange = createStore<RangeValueType<Dayjs>>([dayjs().startOf('day'), dayjs().add(1, 'days').startOf('day')])
// export const $datesRange = createStore<RangeValue<Dayjs>>([dayjs().startOf('day'), dayjs().startOf('day')])
$datesRange.on(updateDatesRangeFx, (state, payload) => payload)
$datesRange.watch((state) => {
	if (state && state[0] && state[1]) {
		const newStartDate = state[0]
		const diffHours = state[1].add(1, 'day').diff(newStartDate, 'hours') / HOURS_IN_CELL
		const newDates: DateModel[] = []
		for (let i = 0; i < diffHours; i++) {
			const newDate = newStartDate.add(i * HOURS_IN_CELL, 'hours')
			newDates.push({
				date: newDate, title: `(Н${getWeekCount(newDate)} / ${Math.floor(Math.random() * 1000)})`
			})
		}

		updateDatesFx(newDates)
	}
})

