import React from 'react';
import './App.css';
import {SquareWithText} from "./SquareWithText";

function App() {
    return (
        <svg width={1300} height={650} style={{backgroundColor: 'gray'}}>
            <circle cx="50" cy="50" r="40" stroke="black" strokeWidth="3" fill="blue"/>
            <SquareWithText x={0} y={0} width={150} height={150} fill={'white'}/>
            <SquareWithText x={150} y={0} width={150} height={150} fill={'red'}/>
        </svg>
    );
}

export default App;
