/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 18.01.2025
 */
import React, { JSX, useState, useEffect } from 'react'
import { Layout, Button, Space } from 'antd'
import { Content } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import { HEADER_HEIGHT } from '../../header/Header'
import { useStore } from 'effector-react'
import { $style } from '../../../store/style'
import { fetchContractsFx } from '../../../api/contract'
import { fetchFlightsFx } from '../../../api/flight'
import { fetchRouteTypeFx, fetchAircraftTypeFx } from '../../../api/dict'
import Properties from './Properties'
import CanvasPanel from '../main/bottom/CanvasPanel'
import { ProfileOutlined, TableOutlined, BarChartOutlined } from '@ant-design/icons'
import HomeTable from './table/HomeTable'

const { Footer } = Layout

const HomePage = (): JSX.Element => {
	const style = useStore($style)
	const [showFooter, setShowFooter] = useState(false)
	const [title, setTitle] = useState('Tables')
	const [mainIcon, setMainIcon] = useState(<TableOutlined/>)

	const [footerOptions, setFooterOptions] = useState({
		main: true,
		properties: true
	})

	useEffect(() => {
		fetchContractsFx()
		fetchFlightsFx()
		fetchRouteTypeFx()
		fetchAircraftTypeFx()
	}, [])

	const isGraph = (): boolean => {
		return 'main' in footerOptions && footerOptions.main === true
	}

	useEffect(() => {
		if ('properties' in footerOptions && footerOptions.properties === true) {
			setShowFooter(true)
		} else {
			setShowFooter(false)
		}

		if (isGraph()) {
			setTitle('Tables')
			setMainIcon(<TableOutlined/>)
		} else {
			setTitle('Graph')
			setMainIcon(<BarChartOutlined/>)
		}
	}, [footerOptions])

	const handleCheckboxChange = (value: any) => {
		setFooterOptions((prev: any) => ({
			...prev,
			[value]: !prev[value]
		}))
	}

	return (
		<Layout style={{ height: `calc(100vh - ${HEADER_HEIGHT}px)` }}>
			<Sider collapsible
				   collapsed={false}
				   trigger={null}
				   width={130}
				   style={{ padding: '10px', backgroundColor: `${style.backgroundColor}` }}
			>
				<Space direction={'vertical'} style={{ width: '100%' }}>
					<Button
						type={'primary'}
						onClick={() => handleCheckboxChange('main')}
						block
						icon={mainIcon}
					>
						{title}
					</Button>
					<Button
						block
						type={footerOptions.properties ? 'primary' : 'default'}
						icon={<ProfileOutlined/>}
						onClick={() => handleCheckboxChange('properties')}
					>
						Properties
					</Button>
				</Space>
			</Sider>
			<Layout>
				<Content
					style={{
						backgroundColor: style.backgroundColor,
						overflow: 'auto'
					}}
				>
					{isGraph() ? <CanvasPanel/> : <HomeTable/>}
				</Content>

				{(showFooter ?? false) && (
					<Footer style={{
						textAlign: 'left'
					}}>
						<Properties/>
					</Footer>)}
			</Layout>
		</Layout>
	)
}

export default HomePage
