import React, {JSX, useState} from "react";
import * as d3 from "d3";

export const LinePlot = ():JSX.Element => {
    const [data, setData] = useState(() => d3.ticks(-2, 2, 200).map(Math.sin));
    const width = 640
    const height = 400
    const marginTop = 20
    const marginRight = 20
    const marginBottom = 20
    const marginLeft = 20
    const x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);
    // @ts-ignore
    const y = d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop]);
    const line = d3.line((d, i) => x(i), y)
    const onMouseMove = (event: any) => {
        const [x, y] = d3.pointer(event)
        setData(data.slice(-200).concat(Math.atan2(x, y)));
    }

    return (
        <div onMouseMove={onMouseMove}>
            <svg width={640} height={400}>
                <path fill={'white'} stroke={'currentColor'} strokeWidth={1.5} d={line(data) as string}/>
                <g fill="white" stroke="currentColor" strokeWidth={1.5}>
                    {data.map((d, i) => (
                        <circle key={i} cx={x(i)} cy={y(d)} r="2.5"/>
                    ))}
                </g>
            </svg>
        </div>
    )
}