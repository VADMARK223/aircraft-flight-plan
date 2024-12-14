/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 14.12.2024
 */
import React, { JSX, useCallback, useEffect, useState } from 'react'
import { Button, Table } from 'antd'
import Modal from 'antd/es/modal/Modal'
import { ColumnsType } from 'antd/es/table'
import { SelectOutlined } from '@ant-design/icons'
import { Flight } from '../../../models/Flight'
import { fetchContracts } from '../../../api/dict'
import { LOCAL_MODE, contractsDefault } from '../../../utils/consts'
import { DictData } from '../../../models/DictData'
import { Key } from 'antd/es/table/interface'

const PAGE_SIZE: number = 5

interface ContractModalProps {
	flight: Flight | null
}

const ContractModal = ({ flight }: ContractModalProps): JSX.Element => {
	const [title, setTitle] = useState<string>('фф')
	const [isContractsModalOpen, setIsContractsModalOpen] = useState<boolean>(false)
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [data, setData] = useState<DictData[]>([])
	const [rowSelected, setRowSelected] = useState<DictData | null>(null)

	const getModalWidth = (): number => {
		const screenWidth = window.innerWidth
		return screenWidth > 1200 ? 1000 : screenWidth * 0.9
	}

	const [modalWidth, setModalWidth] = useState<number>(getModalWidth())

	useEffect(() => {
		if (!LOCAL_MODE) {
			fetchContracts().then((contracts: DictData[]) => {
				if (contracts.length !== 0) {
					setData(contracts)
				}
			})
		} else {
			setData(contractsDefault)
		}
	}, [])

	useEffect(() => {
		if (flight?.contract.value !== undefined) {
			setRowSelected(flight.contract)
		}
	}, [flight])

	useEffect(() => {
		let result = ''
		if (flight === null) {
			if (rowSelected === null) {
				result = 'Выберите контракт для нового рейса'
			} else {
				result = `Для нового рейса контракт сейчас '${rowSelected.value}'.`
			}
		} else {
			result = `Для рейса '${flight.id}' контракт сейчас '${flight.contract.value}'.`
		}
		setTitle(result)
	}, [flight, rowSelected])

	const handleWindowResize = useCallback(() => {
		setModalWidth(getModalWidth())
	}, [])

	useEffect(() => {
		window.addEventListener('resize', handleWindowResize)
		return () => {
			window.removeEventListener('resize', handleWindowResize)
		}
	}, [handleWindowResize])

	const columns: ColumnsType<DictData> = [
		{
			title: 'ID',
			dataIndex: 'value',
			fixed: 'left',
			render: (value: number): number | undefined => {
				if (value >= 0) {
					return value
				}
			}
		},
		{
			title: 'Наименование',
			dataIndex: 'label'
		},
		{
			title: 'Действия',
			dataIndex: 'actions',
			fixed: 'right',
			render: (_: undefined, record: DictData): JSX.Element | undefined => {
				if (record.value >= 0) {
					return (<Button danger>Удалить</Button>)
				}
			}
		}
	]

	const showContractsModal = (): void => {
		setIsContractsModalOpen(true)
	}

	const hideContractsModal = (): void => {
		setIsContractsModalOpen(false)
		setRowSelected(null)
		setCurrentPage(1)
	}

	const paginatedData = () => {
		const start = (currentPage - 1) * PAGE_SIZE
		const end = start + PAGE_SIZE
		const pageData = data.slice(start, end)

		// Если на первой странице мало строк, то не заполняем пустые строки, иначе, чтобы таблица не прыгала, заполняем пустыми
		const calcLength = currentPage === 1 ? Math.min(pageData.length, PAGE_SIZE) : PAGE_SIZE
		while (pageData.length < calcLength) {
			pageData.push({ value: 0 - pageData.length, label: '' })
		}

		return pageData
	}

	const handlerPageChange = (page: number) => {
		setCurrentPage(page)
	}

	const getCheckboxProps = (record: DictData) => ({
		style: record.value < 0 ? { display: 'none' } : undefined
	})

	return (
		<>
			<Button type={'primary'}
					icon={<SelectOutlined/>}
					onClick={showContractsModal}>
				Контракты
			</Button>
			<Modal
				title={title}
				open={isContractsModalOpen}
				onCancel={hideContractsModal}
				style={{ top: 20 }}
				footer={null}
				width={modalWidth}
			>
				<Table
					rowKey={'value'}
					columns={columns}
					dataSource={paginatedData()}
					pagination={{
						current: currentPage,
						pageSize: PAGE_SIZE,
						total: data.length,
						hideOnSinglePage: true,
						onChange: handlerPageChange
					}}
					rowSelection={{
						type: 'radio',
						selectedRowKeys: rowSelected ? [rowSelected.value] : [],
						getCheckboxProps: getCheckboxProps,
						onChange: (_selectedRowKeys: Key[], selectedRows: DictData[]) => {
							setRowSelected(selectedRows[0])
						}
					}}
					rowClassName={'fixed-height-row'}
					scroll={{ x: 'max-content' }}
				/>
			</Modal>
		</>
	)
}

export default ContractModal
