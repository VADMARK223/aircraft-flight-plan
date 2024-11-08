/**
 * @author Markitanov Vadim
 * @since 08.12.2023
 */
import { createStore } from 'effector'
import { Airport } from '../models/Airport'
import { airportsDefault } from '../utils/consts'

export const $airports = createStore<Airport[]>(airportsDefault)