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
import { DictData } from '../../../../../../models/DictData'
import { fetchContracts } from '../../../../../../api/dict'

const ContractEditor = (): JSX.Element => {
	const [addButtonDisabled, setAddButtonDisabled] = React.useState<boolean>(true)
	const [contractName, setContractName] = React.useState<string>('')
	const [contractOptions, setContractOptions] = useState<DictData[]>([])
	const [selectedId, setSelectedId] = useState<number>()
	const [deleteButtonDisabled, setDeleteButtonDisabled] = React.useState<boolean>(true)

	useEffect(() => {
		fetchContracts().then(contracts => {
			if (contracts.length !== 0) {
				setContractOptions(contracts)
			}
		})
	}, [])

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
					 className={'control-panel-divider'}>Добавление контракта</Divider>
			<Space>
				<Space direction={'horizontal'}>
					<Input value={contractName} placeholder={'Наименование контракта'} allowClear
						   onChange={(e) => setContractName(e.target.value)}/>
					<Button type={'primary'} icon={<PlusOutlined/>} disabled={addButtonDisabled} onClick={() => {
						requestAddContractFx(contractName)
						setContractName('')
					}}>Добавить</Button>

					<Select
						placeholder={'Выберите контракт'}
						style={{ width: '160px' }}
						value={selectedId}
						options={contractOptions}
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
							}}>Удалить</Button>
				</Space>
			</Space>
		</Space>
	)
}

export default ContractEditor