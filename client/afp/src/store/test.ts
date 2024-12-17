import { createStore, createEvent } from 'effector'

/**
 * @author Markitanov Vadim
 * @since 10.12.2023
 */
export const TEST_LOCAL_STORAGE_KEY: string = 'aircraft_flight_plan_test'
export const TEST_LOCAL_STORAGE_VALUE: string = 'on'
export const $test = createStore<boolean>(localStorage.getItem(TEST_LOCAL_STORAGE_KEY) === TEST_LOCAL_STORAGE_VALUE)

export const setTest = createEvent<boolean>()

$test.on(setTest, (_state, payload) => payload)
