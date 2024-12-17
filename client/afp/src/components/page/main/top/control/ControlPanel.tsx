/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 18.12.2024
 */
import React, { JSX } from 'react'
import { Space } from 'antd'

const ControlPanel = (): JSX.Element => {
	return (
		<Space direction={'vertical'} style={{ backgroundColor: '#fff', display: 'flex', width: '100%' }}>
			<span>1</span>
			<span>2</span>
			<span>3</span>
		</Space>
	)
}

export default ControlPanel
