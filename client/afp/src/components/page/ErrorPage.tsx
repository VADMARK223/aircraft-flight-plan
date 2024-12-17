/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 17.12.2024
 */
import React, { JSX } from 'react'
import { useRouteError, isRouteErrorResponse } from 'react-router-dom'

const ErrorPage = (): JSX.Element => {
	const error = useRouteError()

	return (
		<div style={{ textAlign: 'center', marginTop: '50px' }}>
			<h1>Что-то пошло не так!</h1>
			{isRouteErrorResponse(error) ? (
				// Если ошибка связана с маршрутизацией
				<>
					<h2>{error.status}</h2>
					<p>{error.statusText}</p>
					{error.data?.message && <p>{error.data.message}</p>}
				</>
			) : (
				// Неизвестная ошибка
				<>
					<p>Произошла неизвестная ошибка.</p>
					<p>
						<i>{error instanceof Error ? error.message : 'Нет данных об ошибке'}</i>
					</p>
				</>
			)}
		</div>
	)
}

export default ErrorPage
