/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 23.11.2023
 */
import React, {JSX} from 'react';
import {Divider, Space} from "antd";
import FlightsControl from "./FlightsControl";
import TripControl from "./TripControl";

const ControlPanel = (): JSX.Element => {
    return (
        <div style={{paddingTop: '5px', paddingLeft: '5px'}}>
            <Space direction={'vertical'} style={{width: '100%'}}>
                <Divider type={'horizontal'} orientation={'left'} style={{margin: '0'}}>Добавление борта</Divider>
                <FlightsControl/>
                <Divider type={'horizontal'} orientation={'left'} style={{margin: '0'}}>Добавление полета</Divider>
                <TripControl/>
            </Space>
        </div>
    )
}

export default ControlPanel