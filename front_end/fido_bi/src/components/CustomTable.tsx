import React, {useEffect, useState} from 'react';
import {Spin, Table} from 'antd';
import type {TableProps} from 'antd/es/table';
import {useSelector} from "react-redux";
import styled from "styled-components";


interface DataType {
    key: React.Key;
    name: string;
    chinese: number;
    math: number;
    english: number;
}
const StyledSpinContainer = styled.div`
  margin: 20px 0;
  padding: 30px 50px;
  text-align: center;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
`;
const CustomTable = () => {
    const data = useSelector((state: any) => state.mainSlice.data);
    const loading = useSelector((state: any) => state.mainSlice.loading);
    const [columns, setColumns] = useState<Array<any>>([]);
    useEffect(() => {
        if (data.length > 0) {
            console.log(data);
            const allColumns = Object.keys(data[0]);
            const columns = allColumns.map(col => ({
                title: col.toUpperCase(),
                dataIndex: col,
                key: col,
                width: 200
            }));
            setColumns(columns);
        }
    }, [data]);
    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    return loading ? <StyledSpinContainer><Spin /></StyledSpinContainer> : <Table bordered size="large" scroll={{ x: 'calc(700px + 50%)', y: window.innerWidth / 100 * 30 }} columns={columns} dataSource={data} onChange={onChange}/>;
    //return  <Table bordered size="middle" scroll={{ x: 'calc(700px + 50%)', y: window.innerWidth / 100 * 30 }} columns={columns} dataSource={data} onChange={onChange}/>;
};

export default CustomTable;