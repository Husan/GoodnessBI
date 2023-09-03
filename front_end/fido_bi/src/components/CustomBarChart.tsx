import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine, Line
} from "recharts";
import {useSelector} from "react-redux";
import {Spin} from "antd";
import styled from "styled-components";
import {generateColor} from "../types";
const StyledSpinContainer = styled.div`
  margin: 20px 0;
  padding: 30px 50px;
  text-align: center;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
`;
const CustomBarChart = ({comparing_columns,comparing_by}:any) => {
    const data = useSelector((state: any) => state.mainSlice.data);
    const loading = useSelector((state: any) => state.mainSlice.loading);
    if (loading) {
        return (
            <StyledSpinContainer><Spin /></StyledSpinContainer>
        )
    }
    return (
        <BarChart
            width={window.innerWidth / 100 * 95}
            height={window.innerHeight / 100 * 85}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={comparing_by} />
            <YAxis />
            <Tooltip />
            <Legend />
            <ReferenceLine y={0} stroke="#000" />
            {comparing_columns.map((value:any) => (
                <Bar dataKey={`${value}`} key={value} fill={generateColor()} />
            ))}
        </BarChart>
    );
};

export default CustomBarChart;