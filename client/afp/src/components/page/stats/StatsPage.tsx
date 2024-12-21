/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 17.12.2024
 */
import React, { JSX, useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { Space } from 'antd'
import Input from 'antd/es/input/Input'

const CURRENT_FOLLOWERS = 9_121
const FOLLOWERS_TARGET = 10_008

const StatsPage = (): JSX.Element => {
	const [followers, setFollowers] = useState<number>(CURRENT_FOLLOWERS)
	const [followersInDay, setFollowersInDay] = useState<number>(0)
	const diffInDays = dayjs(`${dayjs().year() + 1}-01-01`).diff(dayjs(), 'day')

	useEffect(() => {
		const followersInDay = Number(((FOLLOWERS_TARGET - followers) / diffInDays).toFixed(1))
		setFollowersInDay(followersInDay)
	}, [followers, diffInDays])

	return (
		<Space direction={'vertical'}>
			<span>До Нового года осталось {diffInDays} дней!</span>
			<Input value={followers} style={{ width: '240px' }} type={'number'}
				   placeholder={'Введите кол-во подписчиков'} suffix={'тек. кол-во подписчиков'} onChange={(e) => {
				const newFollowers = Number(e.target.value)
				setFollowers(newFollowers)
			}}
			/>
			<span>В день подписчиков: <b style={{ color: 'red' }}>{followersInDay}</b></span>
			<span>Осталось до 10К: <b style={{ color: 'green' }}>{FOLLOWERS_TARGET - followers}</b></span>
		</Space>
	)
}

export default StatsPage
