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
import BottomPanel from '../main/bottom/BottomPanel'
import { useStore } from 'effector-react'
import { $style } from '../../../store/style'
import { fetchContractsFx } from '../../../api/contract'
import { fetchFlightsFx } from '../../../api/flight'
import { fetchRouteTypeFx, fetchAircraftTypeFx } from '../../../api/dict'
import Properties from './Properties'

const { Footer } = Layout

const HomePage = (): JSX.Element => {
	const style = useStore($style)
	const [showFooter, setShowFooter] = useState(false)

	const [footerOptions, setFooterOptions] = useState({
		option1: true,
		option2: false,
		properties: true
	})

	useEffect(() => {
		fetchContractsFx()
		fetchFlightsFx()
		fetchRouteTypeFx()
		fetchAircraftTypeFx()
	}, [])

	useEffect(() => {
		if ('properties' in footerOptions && footerOptions.properties === true) {
			setShowFooter(true)
		} else {
			setShowFooter(false)
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
				<Space direction={'vertical'} style={{width:'100%'}}>
					<Button
						type={footerOptions.option1 ? 'primary' : 'default'}
						onClick={() => handleCheckboxChange('option1')}
						block
						disabled
					>
						Graph
					</Button>
					<Button
						block
						type={footerOptions.properties ? 'primary' : 'default'}
						onClick={() => handleCheckboxChange('properties')}
					>
						Properties
					</Button>
				</Space>
			</Sider>
			<Layout
				style={{
					padding: '16px'
				}}
			>
				<Content
					style={{
						backgroundColor: style.backgroundColor,
						overflow: 'auto'
					}}
				>
					<BottomPanel/>
				</Content>

				{(showFooter ?? false) && (<Footer style={{
					textAlign: 'left',
					padding: '10px'
				}}>
					<Properties/>
				</Footer>)}
			</Layout>
		</Layout>
	)
}

export default HomePage
