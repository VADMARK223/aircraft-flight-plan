/**
 * Компонент управления темой приложения
 *
 * @author Markitanov Vadim
 * @since 06.12.2023
 */
import { JSX } from 'react'
import { useStore } from 'effector-react'
import { $style, setDarkThemeFx, THEME_LOCAL_STORAGE_KEY, THEME_LOCAL_STORAGE_VALUE } from '../../store/style'
import { Space, Switch, Tooltip } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { $test, setTestFx, TEST_LOCAL_STORAGE_KEY, TEST_LOCAL_STORAGE_VALUE } from '../../store/test'
import { SHOW_TEST_TOGGLE } from '../../utils/consts'
import { USER_TIME_ZONE, FORMATTED_OFFSET } from '../../utils/utils'

const ThemeControl = (): JSX.Element => {
	const style = useStore($style)
	const test = useStore($test)
	const onStyleChangeHandler = (value: boolean): void => {
		setDarkThemeFx(value)
		if (value) {
			localStorage.setItem(THEME_LOCAL_STORAGE_KEY, THEME_LOCAL_STORAGE_VALUE)
		} else {
			localStorage.removeItem(THEME_LOCAL_STORAGE_KEY)
		}
	}

	const onTestChangeHandler = (value: boolean): void => {
		setTestFx(value)
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
				<b>{USER_TIME_ZONE + ' ' + FORMATTED_OFFSET}</b>
			</Space>
			<Space direction={'horizontal'}>
				<span>Тёмная тема:</span>
				<Switch
					checkedChildren={<CheckOutlined/>}
					unCheckedChildren={<CloseOutlined/>}
					onChange={onStyleChangeHandler}
					defaultChecked={style.isDarkTheme}
				/>
			</Space>
		</Space>

	)
}

export default ThemeControl
