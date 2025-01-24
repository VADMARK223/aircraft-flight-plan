/**
 * Компонент редактирования контрактов
 *
 * @author Markitanov Vadim
 * @since 07.01.2025
 */
import React, { JSX, useEffect, useState } from 'react'
import { Space, Divider, Button, Select } from 'antd'
import Input from 'antd/es/input/Input'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { requestAddContractFx, requestDeleteContractFx } from '../../../../../../api/contract'
import { useStore } from 'effector-react'
import { $contracts } from '../../../../../../store/contract'

const ContractEditor = (): JSX.Element => {
	const store = useStore($contracts)
	const [addButtonDisabled, setAddButtonDisabled] = React.useState<boolean>(true)
	const [contractName, setContractName] = React.useState<string>('')
	const [selectedId, setSelectedId] = useState<number>()
	const [deleteButtonDisabled, setDeleteButtonDisabled] = React.useState<boolean>(true)

	useEffect(() => {
		setAddButtonDisabled(contractName === '')
	}, [contractName])

	useEffect(() => {
		setDeleteButtonDisabled(selectedId === undefined)
	}, [selectedId])

	return (
		<Space direction={'vertical'} style={{ width: '100%' }}>
			<Divider type={'horizontal'}
					 orientation={'left'}
					 className={'control-panel-divider'}>Adding registration number</Divider>
			<Space>
				<Space direction={'horizontal'}>
					<Input value={contractName} placeholder={'Reg. number'} allowClear
						   onChange={(e) => setContractName(e.target.value)}/>
					<Button type={'primary'} icon={<PlusOutlined/>}
							disabled={addButtonDisabled} onClick={() => {
						requestAddContractFx(contractName)
						setContractName('')
					}}>Add</Button>
				</Space>
			</Space>
			<Divider type={'horizontal'}
					 orientation={'left'}
					 className={'control-panel-divider'}>Removing registration number</Divider>
			<Space>
				<Select
					placeholder={'Select reg. number'}
					style={{ width: '160px' }}
					value={selectedId}
					options={store}
					allowClear
					onChange={value => {
						setSelectedId(value)
					}}
				/>
				<Button type={'primary'}
						danger
						icon={<DeleteOutlined/>}
						disabled={deleteButtonDisabled}
						onClick={() => {
							requestDeleteContractFx(selectedId)
							setSelectedId(undefined)
						}}>Delete</Button>
				</Space>

		</Space>
	)
}

export default ContractEditor
