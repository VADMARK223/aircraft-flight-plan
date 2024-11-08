/**
 * Компонент для рабочих областей.
 *
 * @author Markitanov Vadim
 * @since 06.12.2023
 */
import React, { JSX } from 'react'
import ControlPanel from './components/controlPanel/ControlPanel'
import { useStore } from 'effector-react'
import Svg from './components/svg/Svg'
import { $test } from './store/test'
import Frame from './components/frame/Frame'
import Viewer from './components/viewer/Viewer'

const Main = (): JSX.Element => {
	const test = useStore($test)

	return (
		<>
			<ControlPanel/>
			<Viewer/>
			{/*<Frame/>*/}
			{/*{test ? <Svg/> : <Frame/>}*/}
		</>
	)
}

export default Main
