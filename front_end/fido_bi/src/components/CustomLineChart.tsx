import React, {useState} from 'react';
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
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
const CustomLineChart = ({comparing_by,comparing_columns}: any) => {
    const data = useSelector((state: any) => state.mainSlice.data);
    const loading = useSelector((state: any) => state.mainSlice.loading);
    if (loading) {
        return (
            <StyledSpinContainer><Spin /></StyledSpinContainer>
        )
    }
    return (
        <LineChart width={window.innerWidth / 100 * 95}  height={window.innerHeight / 100 * 85} data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={comparing_by} />
            <YAxis />
            <Tooltip />
            <Legend />
            {comparing_columns.map((value:any) => (
                <Line type="monotone" key={value} dataKey={`${value}`} stroke={generateColor()}  />
            ))}
        </LineChart>
    );
};

export default CustomLineChart;