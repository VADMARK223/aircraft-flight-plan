/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 24.01.2025
 */
import React, { JSX } from 'react'
import { Table } from 'antd'

const HomeTable = (): JSX.Element => {
	const dataSource = [
		{
			key: '1',
			name: 'Иван Иванов',
			age: 32,
			address: 'ул. Пушкина, д. 1',
		},
		{
			key: '2',
			name: 'Петр Петров',
			age: 45,
			address: 'ул. Лермонтова, д. 15',
		},
	];

	const columns = [
		{
			title: 'Имя',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Возраст',
			dataIndex: 'age',
			key: 'age',
		},
		{
			title: 'Адрес',
			dataIndex: 'address',
			key: 'address',
		},
	];

	return <Table dataSource={dataSource} columns={columns} />;
}

export default HomeTable
