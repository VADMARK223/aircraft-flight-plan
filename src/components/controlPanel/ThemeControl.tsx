/**
 * Компонент управления темой приложения
 *
 * @author Markitanov Vadim
 * @since 06.12.2023
 */
import { JSX } from 'react'
import { useStore } from 'effector-react'
import { $common, setDarkThemeFx } from '../../store/common'
import { Space, Switch } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

const ThemeControl = (): JSX.Element => {
	const common = useStore($common)
	const onChangeChandler = (value: boolean): void => {
		setDarkThemeFx(value)
	}

	return (
		<Space>
			<span>Тема:</span>
			<Switch
				checkedChildren={<CheckOutlined/>}
				unCheckedChildren={<CloseOutlined/>}
				onChange={onChangeChandler}
				defaultChecked={common.isDarkTheme}
			/>
		</Space>

	)
}

export default ThemeControl