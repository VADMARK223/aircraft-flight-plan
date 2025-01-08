/**
 * Компонент модального окна работы с рейсом
 *
 * @author Markitanov Vadim
 * @since 07.01.2025
 */
import React, { JSX, useState, useEffect, useRef, useCallback } from 'react'
import { SelectOutlined } from '@ant-design/icons'
import { Button, Table, TablePaginationConfig, CheckboxProps } from 'antd'
import Modal from 'antd/es/modal/Modal'
import { ColumnsType } from 'antd/es/table'
import { DictData } from '../../../../../../models/DictData'
import { TableRowSelection, Key } from 'antd/es/table/interface'
import { useStore } from 'effector-react'
import { $flightSelected } from '../../../../../../store/flight'
import { Flight } from '../../../../../../models/Flight'
import { showError } from '../../../../../../api/common'
import { requestAddFlightFx, requestSaveFlightFx } from '../../../../../../api/flight'
import { requestDeleteContractFx } from '../../../../../../api/contract'
import { EMPTY_FLIGHT } from '../../../../../../utils/flight'
import { $contracts } from '../../../../../../store/contract'

const DEFAULT_BUTTON_LABEL = 'Добавление рейса'
const PAGE_SIZE = 5

const FlightControlModal = (): JSX.Element => {
	const store = useStore($contracts)
	const selectedFlight = useStore($flightSelected)
	const [mainButtonLabel, setMainButtonLabel] = useState<string>(DEFAULT_BUTTON_LABEL)
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const [isEditMode, setIsEditMode] = useState<boolean>(false)

	const [title, setTitle] = useState<string | null>(null)
	const [currentPage, setCurrentPage] = useState<number>(1)
	const getModalWidth = (): number => {
		const screenWidth = window.innerWidth
		return screenWidth > 1200 ? 1000 : screenWidth * 0.9
	}
	const [modalWidth, setModalWidth] = useState<number>(getModalWidth())
	const buttonApplyRef = useRef<HTMLButtonElement>(null)
	const [applyButtonLabel, setApplyButtonLabel] = useState<string | null>('Добавить')
	const [applyButtonDisabled, setApplyButtonDisabled] = useState<boolean>(true)
	const [currentFlight, setCurrentFlight] = useState<Flight>(EMPTY_FLIGHT)

	useEffect(() => {
		setIsEditMode(selectedFlight != null)
		setCurrentFlight(selectedFlight ? selectedFlight : EMPTY_FLIGHT)
	}, [selectedFlight])

	useEffect(() => {
		setMainButtonLabel(isEditMode ? 'Редактирование рейса' : DEFAULT_BUTTON_LABEL)
		setApplyButtonLabel(isEditMode ? 'Применить' : 'Добавить')
	}, [isEditMode])

	useEffect(() => {
		let resultTitle
		let applyButtonDisabled = true
		if (!isEditMode) {
			if (currentFlight.contract.value === -1) {
				resultTitle = `Добавление рейса (выберите контракт)`
			} else {
				resultTitle = `Добавление рейса`
				applyButtonDisabled = false
			}
		} else {
			if (currentFlight.contract.value === selectedFlight?.contract.value) {
				resultTitle = 'Редактирование рейса (контракт прежний)'
			} else {
				resultTitle = `Редактирование рейса (новый контракт: '${currentFlight.contract.value}')`
				applyButtonDisabled = false
			}
		}

		setTitle(resultTitle)
		setApplyButtonDisabled(applyButtonDisabled)

	}, [isEditMode, currentFlight])

	useEffect(() => {
		const handlerKeyDown = (event: KeyboardEvent) => {
			if (event.code === 'Enter') {
				event.preventDefault()
				buttonApplyRef.current?.click()
			}
		}
		if (isModalOpen) {
			document.addEventListener('keydown', handlerKeyDown)
		} else {
			document.removeEventListener('keydown', handlerKeyDown)
		}

		return () => {
			document.removeEventListener('keydown', handlerKeyDown)
		}

	}, [isModalOpen])

	const showModal = (): void => {
		setIsModalOpen(true)
	}

	const hideModal = (): void => {
		setIsModalOpen(false)
		setCurrentPage(1)
		if (selectedFlight == null) {
			resetCurrentFlight()
		} else {
			setCurrentFlight(selectedFlight)
		}
	}

	const handleApplyButton = (): void => {
		setIsModalOpen(false)

		if (currentFlight.contract.value === -1) {
			showError('Контракт не выбран у рейса.')
			return
		}

		if (isEditMode) {
			requestSaveFlightFx(currentFlight)
		} else {
			requestAddFlightFx(currentFlight.contract)
		}

		resetCurrentFlight()
	}

	const resetCurrentFlight = (): void => {
		setCurrentFlight(EMPTY_FLIGHT)
	}

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
					return (<Button danger onClick={() => requestDeleteContractFx(record.value)}>Удалить</Button>)
				}
			}
		}
	]

	const paginatedData = (): DictData[] => {
		const start: number = (currentPage - 1) * PAGE_SIZE
		const end: number = start + PAGE_SIZE
		const pageData: DictData[] = store.slice(start, end)

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

	const getPaginationConfig = (): TablePaginationConfig => ({
		current: currentPage,
		pageSize: PAGE_SIZE,
		total: store.length,
		hideOnSinglePage: true,
		onChange: handlerPageChange
	})

	const getCheckboxProps = (record: DictData): CheckboxProps => ({
		style: record.value < 0 ? { display: 'none' } : undefined
	})

	const getSelectionConfig = (): TableRowSelection<DictData> => ({
		type: 'radio',
		selectedRowKeys: [currentFlight.contract.value],
		getCheckboxProps: getCheckboxProps,
		onChange: (_selectedRowKeys: Key[], selectedRows: DictData[]) => {
			setCurrentFlight({ ...currentFlight, contract: selectedRows[0] })
		}
	})

	const handleWindowResize = useCallback((): void => {
		setModalWidth(getModalWidth())
	}, [])

	useEffect(() => {
		window.addEventListener('resize', handleWindowResize)
		return (): void => {
			window.removeEventListener('resize', handleWindowResize)
		}
	}, [handleWindowResize])

	return (
		<>
			<Button type={'primary'}
					icon={<SelectOutlined/>}
					style={{ minWidth: 200 }}
					onClick={showModal}>
				{mainButtonLabel}
			</Button>

			<Modal
				title={title}
				open={isModalOpen}
				onCancel={hideModal}
				style={{ top: 20 }}
				footer={[
					<Button key={'cancel'} onClick={hideModal}>Отмена</Button>,
					<Button key={'apply'}
							ref={buttonApplyRef}
							type={'primary'}
							disabled={applyButtonDisabled}
							onClick={handleApplyButton}>{applyButtonLabel}</Button>
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

export default FlightControlModal
