/**
 * @author Markitanov Vadim
 * @since 08.12.2023
 */
import { createStore } from 'effector'
import { Airport } from '../models/Airport'

const defaultStore: Airport[] = [
	{
		name: 'Анапа, Краснодарский край',
		country: 'Россия',
		iata: 'AAQ',
		icao: 'URKA'
	},
	{
		name: 'Абакан, Республика Хакасия',
		country: 'Россия',
		iata: 'ABA',
		icao: 'UNAA'
	},
	{
		name: 'Ачинск, Красноярский край',
		country: 'Россия',
		iata: 'ACS',
		icao: 'UNKS'
	},
	{
		name: 'Алдан, Якутия',
		country: 'Россия',
		iata: 'ADH',
		icao: 'UEEA'
	},
	{
		name: 'Сочи, Краснодарский край',
		country: 'Россия',
		iata: 'AER',
		icao: 'URSS'
	},
	{
		name: 'Амдерма, Ненецкий АО',
		country: 'Россия',
		iata: 'AMV',
		icao: 'ULDD'
	},
	{
		name: 'Талаги, Архангельск',
		country: 'Россия',
		iata: 'ARH',
		icao: 'ULAA'
	},
	{
		name: 'Нариманово, Астрахань',
		country: 'Россия',
		iata: 'ASF',
		icao: 'URWA'
	}

]

export const $airports = createStore<Airport[]>(defaultStore)