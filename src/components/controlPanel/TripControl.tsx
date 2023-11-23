/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 23.11.2023
 */
import React, {JSX, useEffect, useState} from 'react';
import {Button, DatePicker, Select, SelectProps, Space} from "antd";
import {useStore} from "effector-react";
import {$flights, addTripFx} from "../../api/flight";
import {DATE_FORMAT} from "../../utils/consts";
import dayjs from "dayjs";
import type {RangeValue} from 'rc-picker/lib/interface'
import {TripModel} from "../../models/TripModel";
import {TripType} from "../../models/TripType";

const TripControl = (): JSX.Element => {
    const flights = useStore($flights)
    const [addTripButtonDisable, setAddTripButtonDisable] = useState<boolean>(true)
    const [selectedFlightId, setSelectedFlightId] = useState<number>()
    // const [startDetectionDate, setStartDetectionDate] = useState(dayjs())
    // const [endDetectionDate, setEndDetectionDate] = useState(dayjs().add(1, 'days'))
    const [startDate, setStartDate] = useState<string>('')
    const [endDate, setEndDate] = useState('')
    let options: SelectProps['options'] = []

    flights.forEach(value => {
        options?.push({value: value.id, label: value.name})
    })

    useEffect(() => {
        setAddTripButtonDisable(selectedFlightId === undefined || startDate === '' || endDate === '')
    }, [selectedFlightId, startDate, endDate]);

    const handlerFlightSelectChange = (value: number | undefined): void => {
        setSelectedFlightId(value)
    }

    const handlerDateChange = (values: RangeValue<dayjs.Dayjs> | null, formatString: [string, string]): void => {
        setStartDate(formatString[0])
        setEndDate(formatString[1])
    }

    const handlerAddTrip = (): void => {
        if (selectedFlightId !== undefined) {
            const newTrip: TripModel = {
                id: '9999',
                flightId: selectedFlightId,
                startDate: dayjs(),
                endDate: dayjs().add(1, 'hours'),
                type: TripType.DEFAULT
            }

            addTripFx(newTrip)
        }
    }

    return (
        <Space>
            <Select placeholder={'Выберите рейс'}
                    options={options}
                    style={{minWidth: '150px'}}
                    onChange={handlerFlightSelectChange}
                    allowClear
            />
            <DatePicker.RangePicker onChange={handlerDateChange}
                                    format={DATE_FORMAT}
                // value={[startDetectionDate, endDetectionDate]}
            />
            <Button type={'primary'}
                    disabled={addTripButtonDisable}
                    onClick={handlerAddTrip}
            >Добавить полет</Button>
        </Space>
    )
}

export default TripControl