/**
 * Компонент добавления/изменения рейсов.
 *
 * @author Markitanov Vadim
 * @since 05.12.2023
 */
import React, { JSX, useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { $flightSelected } from '../../../../../../store/flight'
import { Divider, Space, Switch } from 'antd'
import DeleteAllButton from './DeleteAllButton'
import DeleteButton from './DeleteButton'
import FlightControlModal from './FlightControlModal'
import FlightControlSelect from './FlightControlSelect'
import { Flight } from '../../../../../../models/Flight'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

export const emptyFlight: Flight = {
	id: -1,
	contract: { value: -1, label: 'Пустой контракт' },
	routes: []
}

const FlightControl = (): JSX.Element => {
	const selectedFlight = useStore($flightSelected)
	const [title, setTitle] = useState<string>()
	const [modalMode, setModalMode] = useState<boolean>(true)

	useEffect((): void => {
		setTitle(selectedFlight != null ? `Изменение рейса ${selectedFlight.id} (Контракт: ${selectedFlight.contract.value})` : 'Добавление рейса')
	}, [selectedFlight])

	const onModeChangeHandler = (value: boolean) => {
		setModalMode(value)
	}

	return (
		<Space direction={'vertical'} style={{ width: '100%' }}>
			<Divider type={'horizontal'}
					 orientation={'left'}
					 className={'control-panel-divider'}>{title}</Divider>
			<Space>
				<Switch
					checkedChildren={'Модальное'}
					unCheckedChildren={'Селектор'}
					onChange={onModeChangeHandler}
					defaultChecked={modalMode}
				/>
				{modalMode ? <FlightControlModal/> : <FlightControlSelect/>}
				{selectedFlight ? <DeleteButton/> : undefined}
				<DeleteAllButton/>
			</Space>
		</Space>
	)
}

export default FlightControl
