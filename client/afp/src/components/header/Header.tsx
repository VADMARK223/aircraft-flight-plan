/**
 * Компонент заголовка.
 *
 * @author Markitanov Vadim
 * @since 17.12.2024
 */
import React, { JSX } from 'react'
import Navigation from './Navigation'
import InfoPanel from './InfoPanel'

const Header = (): JSX.Element => {
	return (
		 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
			<Navigation/>
			<InfoPanel/>
		</div>
	)
}

export default Header
