/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 14.12.2024
 */
import React, { JSX, useCallback, useEffect, useState, useRef } from 'react'
import { Button, Table, TablePaginationConfig, CheckboxProps } from 'antd'
import Modal from 'antd/es/modal/Modal'
import { ColumnsType } from 'antd/es/table'
import { SelectOutlined } from '@ant-design/icons'
import { Flight } from '../../../../../../models/Flight'
import { fetchContracts } from '../../../../../../api/dict'
import { DictData } from '../../../../../../models/DictData'
import { Key, TableRowSelection } from 'antd/es/table/interface'
import { showError } from '../../../../../../api/common'

const PAGE_SIZE = 5

interface ContractModalProps {
	flight: Flight | null
	onApply: (contract: DictData) => void
	resetSelection: boolean
	onReset: () => void
}

const DEFAULT_BUTTON_LABEL = 'Выберите контракт'

const ContractModal = ({ flight, onApply, resetSelection, onReset }: ContractModalProps): JSX.Element => {
	const [mainButtonLabel, setMainButtonLabel] = useState<string>(DEFAULT_BUTTON_LABEL)
	const [title, setTitle] = useState<string | null>(null)
	const [isContractsModalOpen, setIsContractsModalOpen] = useState<boolean>(false)
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [data, setData] = useState<DictData[]>([])
	const [rowSelected, setRowSelected] = useState<DictData | null>(null)
	const [applyButtonDisabled, setApplyButtonDisabled] = useState<boolean>(true)

	const getModalWidth = (): number => {
		const screenWidth = window.innerWidth
		return screenWidth > 1200 ? 1000 : screenWidth * 0.9
	}

	const [modalWidth, setModalWidth] = useState<number>(getModalWidth())
	const buttonApplyRef = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		const handlerKeyDown = (event: KeyboardEvent) => {
			if (event.code === 'Enter') {
				event.preventDefault()
				buttonApplyRef.current?.click()
			}
		}
		if (isContractsModalOpen) {
			fetchContracts().then((contracts: DictData[]) => {
				if (contracts.length !== 0) {
					setData(contracts)
				}
			})

			document.addEventListener('keydown', handlerKeyDown)
		} else {
			document.removeEventListener('keydown', handlerKeyDown)
		}

		return () => {
			document.removeEventListener('keydown', handlerKeyDown)
		}

	}, [isContractsModalOpen])

	useEffect((): void => {
		setRowSelected(flight != null ? flight.contract : null)
	}, [flight])

	useEffect((): void => {
		let resultButtonLabel: string = DEFAULT_BUTTON_LABEL
		let resultTitle: string
		if (flight != null) {
			if(rowSelected != null) {
				resultButtonLabel = `Контракт: ${rowSelected.value}`
			}

			if (flight.contract.value === rowSelected?.value) {
				resultTitle = `Для рейса '${flight.id}'. Старый и новый контракты совпадают`
			} else {
				resultTitle = `Для рейса '${flight.id}'. Старый контракт: '${flight.contract.value}' новый: '${rowSelected?.value}'`
			}
		} else {
			if (rowSelected != null) {
				resultButtonLabel = `Контракт: ${rowSelected.value}`
				resultTitle = `Для нового рейса контракт будет: '${rowSelected.value}'`
			} else {
				resultTitle = 'Выберите контракт для нового рейса'
			}
		}
		setMainButtonLabel(resultButtonLabel)
		setTitle(resultTitle)
	}, [flight, rowSelected])

	useEffect((): void => {
		if (resetSelection) {
			setRowSelected(null)
			onReset()
		}
	}, [resetSelection, onReset])

	useEffect(() => {
		setApplyButtonDisabled(!rowSelected || flight?.contract.value === rowSelected?.value)
	}, [rowSelected, flight])

	const handleWindowResize = useCallback((): void => {
		setModalWidth(getModalWidth())
	}, [])

	useEffect(() => {
		window.addEventListener('resize', handleWindowResize)
		return (): void => {
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
		setCurrentPage(1)

		if (flight != null) {
			setRowSelected(flight.contract)
		} else {
			setRowSelected(null)
		}
	}

	const paginatedData = (): DictData[] => {
		const start: number = (currentPage - 1) * PAGE_SIZE
		const end: number = start + PAGE_SIZE
		const pageData: DictData[] = data.slice(start, end)

		// Если на первой странице мало строк, то не заполняем пустые строки, иначе, чтобы таблица не прыгала, заполняем пустыми
		const calcLength = currentPage === 1 ? Math.min(pageData.length, PAGE_SIZE) : PAGE_SIZE
		while (pageData.length < calcLength) {
			pageData.push({ value: 0 - pageData.length, label: '' })
		}

		return pageData
	}

	const handlerPageChange = (page: number): void => {
		setCurrentPage(page)
	}

	const getCheckboxProps = (record: DictData): CheckboxProps => ({
		style: record.value < 0 ? { display: 'none' } : undefined
	})

	const getPaginationConfig = (): TablePaginationConfig => ({
		current: currentPage,
		pageSize: PAGE_SIZE,
		total: data.length,
		hideOnSinglePage: true,
		onChange: handlerPageChange
	})

	const getSelectionConfig = (): TableRowSelection<DictData> => ({
		type: 'radio',
		selectedRowKeys: rowSelected ? [rowSelected.value] : [],
		getCheckboxProps: getCheckboxProps,
		onChange: (_selectedRowKeys: Key[], selectedRows: DictData[]) => {
			setRowSelected(selectedRows[0])
		}
	})

	return (
		<>
			<Button type={'primary'}
					icon={<SelectOutlined/>}
					onClick={showContractsModal}>
				{mainButtonLabel}
			</Button>

			<Modal
				title={title}
				open={isContractsModalOpen}
				onCancel={hideContractsModal}
				style={{ top: 20 }}
				footer={[
					<Button key={'cancel'} onClick={hideContractsModal}>Отмена</Button>,
					<Button key={'apply'}
							ref={buttonApplyRef}
							type={'primary'}
							disabled={applyButtonDisabled}
							onClick={() => {
								setIsContractsModalOpen(false)
								if (rowSelected != null) {
									onApply(rowSelected)
								} else {
									showError('Не выбран контракт')
								}
							}}>Применить</Button>
				]}
				width={modalWidth}>
				<Table
					rowKey={'value'}
					columns={columns}
					dataSource={paginatedData()}
					pagination={getPaginationConfig()}
					rowSelection={getSelectionConfig()}
					rowClassName={'fixed-height-row'}
					scroll={{ x: 'max-content' }}
				/>
			</Modal>
		</>
	)
}

export default ContractModal
