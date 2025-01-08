/**
 * Компонент навигации.
 *
 * @author Markitanov Vadim
 * @since 17.12.2024
 */
import React, { JSX } from 'react'
import { useLocation } from 'react-router'
import { Space, Button } from 'antd'
import { Link } from 'react-router-dom'
import { HomeOutlined, SettingOutlined, BarsOutlined } from '@ant-design/icons'
import { Paths } from './Paths'

const Navigation = (): JSX.Element => {
	return (
		<nav>
			<Space align={'center'}>
				<NavigationLink to={Paths.HOME} icon={<HomeOutlined/>} label={'Главная'}/>
				<NavigationLink to={Paths.SETTINGS} icon={<SettingOutlined/>} label={'Настройки'}/>
				<NavigationLink to={Paths.STATS} icon={<BarsOutlined/>} label={'Статистика'}/>
			</Space>
		</nav>
	)
}

interface NavigationLinkProps {
	to: string,
	icon
		:
		React.ReactNode
	label: string
}

const NavigationLink = ({ to, icon, label }: NavigationLinkProps): JSX.Element => {
	const location = useLocation()

	return (
		<Link to={to}>
			<Button type={location.pathname === to ? 'primary' : 'default'}
					size={'small'}
					icon={icon}>{label}</Button>
		</Link>
	)
}

export default Navigation
