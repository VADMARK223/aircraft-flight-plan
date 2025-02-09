/**
 * Компонент контроллера масштаба дат.
 *
 * @author Markitanov Vadim
 * @since 09.02.2025
 */
import React, { JSX } from 'react'
import { Space } from 'antd'
import ZoomControl from './ZoomControl'
import DateControl from './DateControl'

const DateRangeControl = (): JSX.Element => {
	return (
        <Space direction={'horizontal'}>
            <ZoomControl/>
            <DateControl/>
        </Space>
	)
}

export default DateRangeControl
