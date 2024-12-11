/**
 * Компонент выбора типа борта.
 *
 * @author Markitanov Vadim
 * @since 05.12.2024
 */
import React, { JSX, useEffect, useState } from 'react'
import { Select } from 'antd'
import { useStore } from 'effector-react'
import { $aircraftTypeDictStore } from '../../../store/dict'
import { DictData } from '../../../models/DictData'

const AircraftTypeSelect = (): JSX.Element => {
	const store = useStore($aircraftTypeDictStore)
	const [aircraftTypeOptions, setAircraftTypeOptions] = useState<DictData[]>([])

	useEffect(() => {
		if (store.length !== 0) {
			setAircraftTypeOptions(store)
		}
	}, [store])

	return (
		<Select
			disabled
			placeholder={'Тип борта'}
			options={aircraftTypeOptions}
			style={{ width: '160px' }}
			popupMatchSelectWidth={false}
		/>
	)
}

export default AircraftTypeSelect
