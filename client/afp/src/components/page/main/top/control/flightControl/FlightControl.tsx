/**
 * Компонент добавления/изменения рейсов.
 *
 * @author Markitanov Vadim
 * @since 05.12.2023
 */
import React, { JSX, useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { $flightSelected } from '../../../../../../store/flight'
import { Button, Divider, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import DeleteAllButton from './DeleteAllButton'
import { requestAddFlightFx } from '../../../../../../api/flight'
import { DictData } from '../../../../../../models/DictData'
import ContractModal from './ContractModal'
import DeleteButton from './DeleteButton'
import SaveButton from './SaveButton'

const FlightControl = (): JSX.Element => {
	const selectedFlight = useStore($flightSelected)
	const [title, setTitle] = useState<string>()
	const [contract, setContract] = useState<DictData | null>(null)
	const [addButtonDisabled, setAddButtonDisabled] = useState<boolean>(true)

	const [resetSelection, setResetSelection] = useState<boolean>(false)

	useEffect((): void => {
		setTitle(selectedFlight != null ? `Изменение рейса ${selectedFlight.id}` : 'Добавление рейса')
	}, [selectedFlight])

	useEffect((): void => {
		setAddButtonDisabled(contract == null)
	}, [contract, selectedFlight?.contract.value])

	const handlerAddFlight = (): void => {
		if (contract == null) {
			return
		}
		requestAddFlightFx(contract)

		setContract(null)
		setResetSelection(true)
	}

	return (
		<Space direction={'vertical'} style={{ width: '100%' }}>
			<Divider type={'horizontal'}
					 orientation={'left'}
					 className={'control-panel-divider'}>{title}</Divider>
			<Space>
				<ContractModal flight={selectedFlight}
							   onApply={(contract: DictData): void => {
								   setContract(contract)
							   }}
							   resetSelection={resetSelection}
							   onReset={() => setResetSelection(false)}
				/>

				{selectedFlight ?
					<>
						<SaveButton contract={contract}/>
						<DeleteButton/>
					</>
					:
					<Button type={'primary'}
							style={{ minWidth: 150 }}
							icon={<PlusOutlined/>}
							onClick={handlerAddFlight}
							disabled={addButtonDisabled}
					>Добавить</Button>
				}
				<DeleteAllButton/>
			</Space>
		</Space>
	)
}

export default FlightControl
