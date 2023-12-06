/**
 * Компонент управления темой приложения
 *
 * @author Markitanov Vadim
 * @since 06.12.2023
 */
import { JSX } from 'react'
import { useStore } from 'effector-react'
import { $style, setDarkThemeFx } from '../../store/style'
import { Space, Switch } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

const ThemeControl = (): JSX.Element => {
	const style = useStore($style)
	const onChangeChandler = (value: boolean): void => {
		setDarkThemeFx(value)
	}

	return (
		<Space>
			<span>Тёмная тема:</span>
			<Switch
				checkedChildren={<CheckOutlined/>}
				unCheckedChildren={<CloseOutlined/>}
				onChange={onChangeChandler}
				defaultChecked={style.isDarkTheme}
			/>
		</Space>

	)
}

export default ThemeControl