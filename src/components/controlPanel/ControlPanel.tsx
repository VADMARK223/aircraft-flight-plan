/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 23.11.2023
 */
import React, {ChangeEvent, JSX, useEffect, useState} from 'react';
import {Button, Input, Space} from "antd";
import {addFlightFx} from "../../api/flight";
import {FlightModel} from "../../models/FlightModel";

const ControlPanel = (): JSX.Element => {
    const [flightName, setFlightName] = useState<string>('')
    const [addFlightButtonDisable, setAddFlightButtonDisable] = useState<boolean>(true)

    useEffect(() => {
        setAddFlightButtonDisable(flightName === '')
    }, [flightName]);

    const handlerAddFlight = (): void => {
        const newFlight: FlightModel = {
            id: -1,
            name: flightName
        }
        addFlightFx(newFlight)
    }

    const changeFlightName = (e: ChangeEvent<HTMLInputElement>) => {
        setFlightName(e.target.value)
    }

    return (
        <div style={{paddingTop: '5px', paddingLeft: '5px'}}>
            <Space>
                <Input placeholder={'Введите название рейса'}
                       onChange={changeFlightName}
                       value={flightName}
                       allowClear
                />
                <Button type={'primary'}
                        disabled={addFlightButtonDisable}
                        onClick={handlerAddFlight}>Добавить рейс</Button>
            </Space>
        </div>
    )
}

export default ControlPanel