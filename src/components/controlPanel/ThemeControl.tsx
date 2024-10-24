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
		<Space>
			<div
				style={{ display: SHOW_TEST_TOGGLE ? undefined : 'none' }}
			>
				<Space>
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
				</Space>
			</div>
			<span>Тёмная тема:</span>
			<Switch
				checkedChildren={<CheckOutlined/>}
				unCheckedChildren={<CloseOutlined/>}
				onChange={onStyleChangeHandler}
				defaultChecked={style.isDarkTheme}
			/>
		</Space>

	)
}

export default ThemeControl