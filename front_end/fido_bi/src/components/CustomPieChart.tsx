import React, {useEffect, useState} from 'react';
import {PieChart, Pie, Tooltip, Bar} from "recharts";
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
const CustomPieChart = ({comparing_columns}: any) => {
    const data = useSelector((state: any) => state.mainSlice.data);
    const loading = useSelector((state: any) => state.mainSlice.loading);
    const [overAllData,setOverAllData] = useState<Array<{name: string,value: number}>>([]);
    useEffect(()=>{
        const sa = comparing_columns.map((col:any) => {
            const value = data.reduce((acc:any, row:any) => acc + Number(row[col]), 0);
            return { name: col, value };
        });
        setOverAllData(sa);
    },[data]);
    console.log('overAllData',overAllData)
    if (loading) {
        return (
            <StyledSpinContainer><Spin /></StyledSpinContainer>
        )
    }
    return (
        <PieChart width={window.innerWidth / 100 * 95} height={window.innerHeight / 100 * 85}>
                <Pie
                    dataKey={"value"}
                    startAngle={0}
                    endAngle={360}
                    data={overAllData}
                    cx={650}
                    cy={250}
                    outerRadius={120}
                    fill={'#8884d8'}
                    label
                />
            <Tooltip/>
        </PieChart>
    );
};

export default CustomPieChart;