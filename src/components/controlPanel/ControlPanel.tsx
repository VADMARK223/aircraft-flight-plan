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
            <Space>
                <FlightsControl/>
                <Divider type={'vertical'}/>
                <TripControl/>
            </Space>
        </div>
    )
}

export default ControlPanel