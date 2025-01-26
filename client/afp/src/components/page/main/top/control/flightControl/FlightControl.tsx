/**
 * Компонент добавления/изменения рейсов.
 *
 * @author Markitanov Vadim
 * @since 05.12.2023
 */
import React, { JSX, useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { $flightsSelected } from '../../../../../../store/flight'
import { Divider, Space } from 'antd'
import DeleteAllButton from './DeleteAllButton'
import DeleteButton from './DeleteButton'
import FlightControlModal from './FlightControlModal'
import FlightControlSelect from './FlightControlSelect'
import FlightEditorModeSwitcher from '../../../../settings/FlightEditorModeSwitcher'
import { LocalStoreKey } from '../../../../../../utils/localStorage'

const FlightControl = (): JSX.Element => {
	const flightsSelected = useStore($flightsSelected)
	const lastFlightSelected = flightsSelected.at(-1);
	const [title, setTitle] = useState<string>()
	const [selectorMode, setSelectorMode] = useState<boolean>(!!localStorage.getItem(LocalStoreKey.FLIGHT_EDIT_MODE))

	useEffect((): void => {
		setTitle(lastFlightSelected != null ? `Flight change ${lastFlightSelected.id} (Reg. number: ${lastFlightSelected.contract.label})` : 'Adding a flight')
	}, [lastFlightSelected])

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
				{lastFlightSelected ? <DeleteButton/> : undefined}
				<DeleteAllButton/>
			</Space>
		</Space>
	)
}

export default FlightControl
