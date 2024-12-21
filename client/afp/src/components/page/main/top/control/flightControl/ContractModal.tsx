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
import Checkbox from 'antd/es/checkbox/Checkbox'
import { emptyFlight } from './FlightControl'

const PAGE_SIZE = 5

interface ContractModalProps {
	selectedFlight: Flight | null,
	outFlightState: [Flight, React.Dispatch<React.SetStateAction<Flight>>]
	inFlightState: [Flight, React.Dispatch<React.SetStateAction<Flight>>]
	onApply: (autoAddSave: boolean) => void
	applyButtonDisabled: boolean
	isNewFlight: boolean
}

const DEFAULT_BUTTON_LABEL = 'Выбор контракта'

const ContractModal = ({
						   selectedFlight,
						   inFlightState,
						   outFlightState,
						   onApply,
						   applyButtonDisabled,
						   isNewFlight
					   }: ContractModalProps): JSX.Element => {
	const [inFlight, setInFlight] = inFlightState
	const [outFlight, setOutFlight] = outFlightState  // Выходящий рейс
	const [mainButtonLabel, setMainButtonLabel] = useState<string>(DEFAULT_BUTTON_LABEL)
	const [title, setTitle] = useState<string | null>(null)
	const [isContractsModalOpen, setIsContractsModalOpen] = useState<boolean>(false)
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [data, setData] = useState<DictData[]>([])
	const [autoAddSave, setAutoAddSave] = useState<boolean>(true)

	const getModalWidth = (): number => {
		const screenWidth = window.innerWidth
		return screenWidth > 1200 ? 1000 : screenWidth * 0.9
	}

	const [modalWidth, setModalWidth] = useState<number>(getModalWidth())
	const buttonApplyRef = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		setInFlight(selectedFlight || emptyFlight)
	}, [selectedFlight])

	useEffect(() => {
		setOutFlight(inFlight.id !== -1 ? inFlight : emptyFlight)
	}, [inFlight])

	// Установка заголовка модального окна
	useEffect(() => {
		let result: string
		if (isNewFlight) {
			if (outFlight.contract.value === -1) {
				result = 'Выберите контракт для нового рейса'
			} else {
				result = `Для нового рейса контракт будет: '${outFlight.contract.value}'`
			}
		} else {
			if (inFlight.contract.value === outFlight.contract.value) {
				result = `Для рейса '${inFlight.id}'. Старый и новый контракты совпадают`
			} else {
				result = `Для рейса '${inFlight.id}'. Старый контракт: '${inFlight.contract.value}' новый: '${outFlight.contract.value}'`
			}
		}
		setTitle(result)
	}, [isNewFlight, inFlight, outFlight])

	// Установка подписи кнопки вызова модального окна
	useEffect(() => {
		if (isNewFlight) {
			if (outFlight.contract.value !== -1) {
				setMainButtonLabel(`Новый контракт: ${outFlight.contract.value}`)
			} else {
				setMainButtonLabel(DEFAULT_BUTTON_LABEL)
			}

		} else {
			setMainButtonLabel(DEFAULT_BUTTON_LABEL)
		}
	}, [isNewFlight, outFlight])

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
					return (<Button danger disabled>Удалить</Button>)
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
		if (isNewFlight) {
			setOutFlight(emptyFlight)
		} else {
			setOutFlight(inFlight)
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
		selectedRowKeys: [outFlight.contract.value],
		getCheckboxProps: getCheckboxProps,
		onChange: (_selectedRowKeys: Key[], selectedRows: DictData[]) => {
			if (inFlight) {
				setOutFlight({ ...outFlight, contract: selectedRows[0] })
			}
		}
	})

	const handleApplyButton = (): void => {
		setIsContractsModalOpen(false)
		onApply(autoAddSave)
	}

	return (
		<>
			<Button type={'primary'}
					icon={<SelectOutlined/>}
					style={{ minWidth: 200 }}
					onClick={showContractsModal}>
				{mainButtonLabel}
			</Button>

			<Modal
				title={title}
				open={isContractsModalOpen}
				onCancel={hideContractsModal}
				style={{ top: 20 }}
				footer={[
					<Checkbox key={'checkbox'}
							  checked={autoAddSave}
							  onChange={e => setAutoAddSave(e.target.checked)}>
						Автоматически {isNewFlight ? 'добавлять' : 'сохранять'} после применения</Checkbox>,
					<Button key={'cancel'} onClick={hideContractsModal}>Отмена</Button>,
					<Button key={'apply'}
							ref={buttonApplyRef}
							type={'primary'}
							disabled={applyButtonDisabled}
							onClick={handleApplyButton}>Применить</Button>
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
