/**
 * Компонент заголовка.
 *
 * @author Markitanov Vadim
 * @since 17.12.2024
 */
import React, { JSX } from 'react'
import Navigation from './Navigation'
import InfoPanel from './InfoPanel'

export const HEADER_HEIGHT = 24

const Header = (): JSX.Element => {
	return (
		<div id={'afp-header'}
			style={{
			display: 'flex',
			justifyContent: 'space-between',
			height: HEADER_HEIGHT,
			alignItems: 'flex-start'
		}}>
			<Navigation/>
			<InfoPanel/>
		</div>
	)
}

export default Header
