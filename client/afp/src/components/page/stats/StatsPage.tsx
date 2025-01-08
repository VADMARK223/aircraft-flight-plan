/**
 * Компонент страницы статистики.
 *
 * @author Markitanov Vadim
 * @since 17.12.2024
 */
import React, { JSX } from 'react'
import { Space } from 'antd'
import { $contracts } from '../../../store/contract'
import { $flights } from '../../../store/flight'
import { useStore } from 'effector-react'

const StatsPage = (): JSX.Element => {
	const contracts = useStore($contracts)
	const flights = useStore($flights)

	return (
		<Space direction={'vertical'}>
			<span>Всего контрактов: <b style={{ color: 'green' }}>{contracts.length}</b></span>
			<span>Всего рейсов: <b style={{ color: 'green' }}>{flights.length}</b></span>
		</Space>
	)
}

export default StatsPage
