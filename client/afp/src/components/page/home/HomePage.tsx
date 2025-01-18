/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 18.01.2025
 */
import React, { JSX, useState, useEffect } from 'react'
import { Button, Layout, Menu } from 'antd'
import { Content } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import { HEADER_HEIGHT } from '../../header/Header'
import BottomPanel from '../main/bottom/BottomPanel'
import { useStore } from 'effector-react'
import { $style } from '../../../store/style'
import { fetchContractsFx } from '../../../api/contract'
import { fetchFlightsFx } from '../../../api/flight'
import { fetchRouteTypeFx, fetchAircraftTypeFx } from '../../../api/dict'

const { Footer } = Layout

const HomePage = (): JSX.Element => {
	const [collapsed, setCollapsed] = useState(false)
	const style = useStore($style)

	useEffect(() => {
		fetchContractsFx()
		fetchFlightsFx()
		fetchRouteTypeFx()
		fetchAircraftTypeFx()
	}, [])

	return (
		<Layout style={{ height: `calc(100vh - ${HEADER_HEIGHT}px)` }}>
			<Layout>
				<Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
					<Menu
						mode="inline"
						defaultSelectedKeys={['1']}
						items={[
							{ key: '1', label: 'Properties' },
							{ key: '2', label: 'Graph', disabled: true },
							{ key: '3', label: 'Options', disabled: true },
							{ key: '4', label: 'Flight', disabled: true }
						]}
					/>
				</Sider>

				<Layout style={{ padding: '16px' }}>
					<Content
						style={{
							// backgroundColor: '#fff',
							backgroundColor: style.backgroundColor,
							overflow: 'auto' // Прокрутка для центрального контента
						}}
					>
						{/*<div
							style={{
								width: '200%',
								height: '200%',
								border: '1px solid #ddd'
							}}
						>
							Контент с горизонтальной и вертикальной прокруткой
						</div>*/}
						<BottomPanel/>
					</Content>

					<Footer style={{ textAlign: 'center', padding: '10px' }}>
						<Button
							type="primary"
							onClick={() => setCollapsed(!collapsed)}
						>
							{collapsed ? 'Открыть меню' : 'Закрыть меню'}
						</Button>
					</Footer>
				</Layout>
			</Layout>
		</Layout>
	)
}

export default HomePage
