/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 18.12.2024
 */
import React, { JSX } from 'react'
import { useStore } from 'effector-react'
import { $test, setTest, TEST_LOCAL_STORAGE_KEY, TEST_LOCAL_STORAGE_VALUE } from '../../../../store/test'
import { Space, Tooltip, Switch } from 'antd'
import { SHOW_TEST_TOGGLE } from '../../../../utils/consts'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { LOCAL_TIME_ZONE, FORMATTED_OFFSET } from '../../../../utils/utils'

const InfoPanel = (): JSX.Element => {
	const test = useStore($test)

	const onTestChangeHandler = (value: boolean): void => {
		setTest(value)
		if (value) {
			localStorage.setItem(TEST_LOCAL_STORAGE_KEY, TEST_LOCAL_STORAGE_VALUE)
		} else {
			localStorage.removeItem(TEST_LOCAL_STORAGE_KEY)
		}
	}

	return (
		<Space direction={'vertical'} align={'end'}>
			{SHOW_TEST_TOGGLE ? <Space>
				<Tooltip title={'В разработке'}>
					<span>Режим перетаскивания:</span>
					<Switch
						disabled
						checkedChildren={<CheckOutlined/>}
						unCheckedChildren={<CloseOutlined/>}
						onChange={onTestChangeHandler}
						defaultChecked={test}
					/>
				</Tooltip>
			</Space> : null
			}
			<Space direction={'horizontal'}>
				<span>Временная зона:</span>
				<b>{LOCAL_TIME_ZONE + ' ' + FORMATTED_OFFSET}</b>
			</Space>
		</Space>
	)
}

export default InfoPanel
