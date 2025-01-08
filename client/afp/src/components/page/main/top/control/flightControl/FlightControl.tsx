/**
 * Компонент добавления/изменения рейсов.
 *
 * @author Markitanov Vadim
 * @since 05.12.2023
 */
import React, { JSX, useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { $flightSelected } from '../../../../../../store/flight'
import { Divider, Space } from 'antd'
import DeleteAllButton from './DeleteAllButton'
import DeleteButton from './DeleteButton'
import FlightControlModal from './FlightControlModal'
import FlightControlSelect from './FlightControlSelect'
import { LocalStoreKey } from '../../../../../../store/style'
import FlightEditorModeSwitcher from '../../../../settings/FlightEditorModeSwitcher'

const FlightControl = (): JSX.Element => {
	const selectedFlight = useStore($flightSelected)
	const [title, setTitle] = useState<string>()
	const [selectorMode, setSelectorMode] = useState<boolean>(!!localStorage.getItem(LocalStoreKey.FLIGHT_EDIT_MODE))

	useEffect((): void => {
		setTitle(selectedFlight != null ? `Изменение рейса ${selectedFlight.id} (Контракт: ${selectedFlight.contract.value})` : 'Добавление рейса')
	}, [selectedFlight])

	const onModeChangeHandler = (value: boolean) => {
		setSelectorMode(value)
	}

	return (
		<Space direction={'vertical'} style={{ width: '100%' }}>
			<Divider type={'horizontal'}
					 orientation={'left'}
					 className={'control-panel-divider'}>{title}</Divider>
			<Space>
				<FlightEditorModeSwitcher callback={onModeChangeHandler}/>
				{selectorMode ? <FlightControlSelect/> : <FlightControlModal/>}
				{selectedFlight ? <DeleteButton/> : undefined}
				<DeleteAllButton/>
			</Space>
		</Space>
	)
}

export default FlightControl
