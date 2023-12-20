/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 09.12.2023
 */
import React, { JSX } from 'react'
import DateItem from './DateItem'
import { DATE_ITEM_WIDTH, HEADER_HEIGHT } from '../../../utils/consts'
import { useStore } from 'effector-react'
import { $dates } from '../../../store/date'

const Dates = (): JSX.Element => {
	const dates = useStore($dates)
	return (
		<g cursor={'pointer'} id={'DATES'}>
			{/*<DatesHeader/>*/}
			{dates.map((value, index) => (
				<DateItem key={index}
						  data={value}
						  x={DATE_ITEM_WIDTH * index}
						  y={HEADER_HEIGHT}/>))}
		</g>
	)
}

export default Dates