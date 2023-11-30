/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 23.11.2023
 */
import React, {ChangeEvent, JSX, useEffect, useState} from 'react';
import {Button, Input, Select, Space} from "antd";
import {FlightModel} from "../../models/FlightModel";
import {addFlightFx} from "../../api/flight";

const FlightsControl = (): JSX.Element => {
    const [flightName, setFlightName] = useState<string>('')
    const [addFlightButtonDisable, setAddFlightButtonDisable] = useState<boolean>(true)

    useEffect(() => {
        setAddFlightButtonDisable(flightName === '')
    }, [flightName]);

    const handlerAddFlight = (): void => {
        const newFlight: FlightModel = {
            id: -1,
            name: flightName,
            trips: []
        }
        addFlightFx(newFlight)
    }

    const changeFlightName = (e: ChangeEvent<HTMLInputElement>) => {
        setFlightName(e.target.value)
    }

    return (
        <Space>
            <span>Название борта:</span>
            <Input placeholder={'Введите название борта'}
                   onChange={changeFlightName}
                   value={flightName}
                   allowClear
            />
            <span>Тип борта:</span>
            <Select placeholder={'Тип борта'} disabled/>
            <Button type={'primary'}
                    disabled={addFlightButtonDisable}
                    onClick={handlerAddFlight}>Добавить борт</Button>
        </Space>
    );
}

export default FlightsControl