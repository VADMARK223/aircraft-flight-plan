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

const PAGE_SIZE: number = 5

interface ContractType {
	id: number
	name: string
}

const ContractModal = (): JSX.Element => {
	const [isContractsModalOpen, setIsContractsModalOpen] = useState<boolean>(false)
	const [currentPage, setCurrentPage] = useState<number>(1)

	const getModalWidth = (): number => {
		const screenWidth = window.innerWidth
		return screenWidth > 1200 ? 1000 : screenWidth * 0.9
	}

	const [modalWidth, setModalWidth] = useState<number>(getModalWidth())

	const handleWindowResize = useCallback(() => {
		setModalWidth(getModalWidth())
	}, [])

	useEffect(() => {
		window.addEventListener('resize', handleWindowResize)
		return () => {
			window.removeEventListener('resize', handleWindowResize)
		}
	}, [handleWindowResize])

	const columns: ColumnsType<ContractType> = [
		{
			title: 'ID',
			dataIndex: 'id',
			fixed: 'left',
			render: (value: number): number | undefined => {
				if (value >= 0) {
					return value
				}
			}
		},
		{
			title: 'Наименование',
			dataIndex: 'name'
		},
		{
			title: 'Наименование1',
			dataIndex: 'name'
		},
		{
			title: 'Наименование2',
			dataIndex: 'name'
		},
		{
			title: 'Наименование3',
			dataIndex: 'name'
		},
		{
			title: 'Наименование4',
			dataIndex: 'name'
		},
		{
			title: 'Наименование5',
			dataIndex: 'name'
		},
		{
			title: 'Наименование6',
			dataIndex: 'name'
		},
		{
			title: 'Наименование7',
			dataIndex: 'name'
		},
		{
			title: 'Действия',
			dataIndex: 'actions',
			fixed: 'right',
			render: (_: undefined, record: ContractType): JSX.Element | undefined => {
				if (record.id >= 0) {
					return (<Button danger>Удалить</Button>)
				}
			}
		}
	]

	const data: ContractType[] = Array.from({ length: 21 }, (_: ContractType, index) => ({
		id: index + 1,
		name: `name_${index + 1}`
	}))

	const showContractsModal = (): void => {
		setIsContractsModalOpen(true)
	}

	const hideContractsModal = (): void => {
		setIsContractsModalOpen(false)
	}

	const paginatedData = () => {
		const start = (currentPage - 1) * PAGE_SIZE
		const end = start + PAGE_SIZE
		const pageData = data.slice(start, end)

		while (pageData.length < PAGE_SIZE) {
			pageData.push({ /*key: `empty-${pageData.length}`,*/ id: 0 - pageData.length, name: '' })
		}

		return pageData
	}

	const handlerPageChange = (page: number) => {
		setCurrentPage(page)
	}

	return (
		<>
			<Button type={'primary'} onClick={showContractsModal}>
				Контракты
			</Button>
			<Modal
				title={'Список контрактов'}
				open={isContractsModalOpen}
				onCancel={hideContractsModal}
				style={{ top: 20 }}
				footer={null}
				width={modalWidth}
			>
				<Table
					rowKey={'id'}
					columns={columns}
					dataSource={paginatedData()}
					pagination={{
						pageSize: PAGE_SIZE,
						total: data.length,
						hideOnSinglePage: true,
						onChange: handlerPageChange
					}}
					rowClassName={'fixed-height-row'}
					scroll={{ x: 'max-content' }}
				/>
			</Modal>
		</>
	)
}

export default ContractModal
