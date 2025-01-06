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
import InfoPanel from '../page/main/top/InfoPanel'

const Navigation = (): JSX.Element => {
	return (
		<nav>
			<Space>
				<NavigationLink to={'/'} icon={<HomeOutlined/>} label={'Главная'}/>
				<NavigationLink to={'/settings'} icon={<SettingOutlined/>} label={'Настройки'}/>
				<NavigationLink to={'/stats'} icon={<BarsOutlined/>} label={'Статистика'}/>
				<InfoPanel/>
			</Space>
		</nav>
	)
}

interface NavigationLinkProps {
	to: string,
	icon: React.ReactNode
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
