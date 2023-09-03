import React, {useEffect, useState} from 'react';
import {Button, Form, Input, Select, Row, Col, Drawer, Space,Divider} from 'antd';
import {DoubleRightOutlined, MenuUnfoldOutlined, MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {BarChartCustom, LineChartCustom, PieChartCustom, Table} from "../types";
import {useDispatch, useSelector} from "react-redux";
import {GET_INITIAL_DATA, SEND_QUERY} from "../redux/types";
import {initialDataOfTableSources, initialDataOfTableSourcesColumns} from "../data";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type FieldType = {
    source?: string;
    columns?: string;
    showType?: string;
    comparing_by?: string;
    comparing_columns?: string;
};

interface IColumnsData {
    id: number,
    table_source_id: string,
    is_filterable: boolean,
    is_comparable: boolean,
    column_name: string,
    column_description: string
};

interface IShowingTypes {
    value: string,
    label: string
};

const SourceForm = () => {
    const [content, setContent] = useState<React.ReactNode | null>(null);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const tableSources = useSelector((state: any) => state.mainSlice.tableSources);
    const tableSourcesColumns = useSelector((state: any) => state.mainSlice.tableSourcesColumns);
    const showingTypesAll: Array<IShowingTypes> = [
        {value: 'table', label: "Table"},
        {value: 'pie_chart', label: "Pie Chart"},
        {value: 'bar_chart', label: "Bar Chart"},
        {value: 'line_chart', label: "Line Chart"},
    ];
    const [selectedSource, setSelectedSource] = useState<string>('');
    const [filteringColumns, setFilteringColumns] = useState<any>();
    const [comparingColumns, setComparingColumns] = useState<any>();
    const [showingType, setShowingType] = useState<string>('');
    const [operators, setOperators] = useState<any>([
        {value: '=', label: '=', disabled: false},
        {value: 'like', label: 'like', disabled: false},
        {value: 'in', label: 'in', disabled: false},
    ]);
    const [sourceOptions, setSourceOptions] = useState([]);
    const [comparingByData, setComparingByData] = useState([]);
    const [sourceOptionsColumns, setSourceOptionsColumns] = useState<any>([]);
    const [sourceFieldsOptions, setSourceFieldsOptions] = useState<Array<IColumnsData>>([]);
    const [selectedItems, setSelectedItems] = useState<Array<string>>([]);
    const filteredOptions = sourceFieldsOptions.filter((o: any) => !selectedItems.includes(o.column_name));
    const showDrawer = () => {
        setOpen(true);
      };
    
      const onClose = () => {
        setOpen(false);
      };
    useEffect(() => {
        dispatch({type: GET_INITIAL_DATA, initialDataOfTableSources, initialDataOfTableSourcesColumns});
    }, []);
    useEffect(() => {
        if (tableSources.length > 0) {
            const d = tableSources.map((item: any) => ({
                id: item.id,
                label: item.name,
                value: item.id
            }));
            setSourceOptions(d);
        }
    }, [tableSources]);
    useEffect(() => {
        if (tableSourcesColumns.length > 0) {
            setSourceOptionsColumns(tableSourcesColumns);
        }
    }, [tableSourcesColumns]);
    const onFinish = (values: any) => {
        console.log('values',values);
        const {table_name} = tableSources.find((source: any) => source.id === selectedSource);
        const fields = tableSourcesColumns
            .filter((col: any) => col.table_source_id === selectedSource && values.columns.includes(col.column_name))
            .map((col: any) => ({
                column: col.column_name,
                format: col.column_format,
                type: col.column_type
            }));
        let filters = [];
        if (values.filters && values.filters.length > 0) {
            for (let fil of values.filters) {
                let {column_type} = tableSourcesColumns.find((col: any) => col.table_source_id === selectedSource && col.column_name === fil.column);
                if (column_type === 'number') {
                    filters.push({column: fil.column, operator: fil.operator, value: parseInt(fil.value), dataType: column_type})
                } else {
                    filters.push({column: fil.column, operator: fil.operator, value: fil.value, dataType: column_type});
                }
            }
        }
        const data = {
            query: {
                id: table_name,
                source: table_name,
                fields,
                filters
            }
        }
        dispatch({type: SEND_QUERY, data});
        if (values.showType === 'table') {
            const res = new Table<any>();
            setContent(res.draw());
            setOpen(false);
        } else if (values.showType === 'line_chart') {
            const res = new LineChartCustom<any>(values.comparing_columns,values.comparing_by);
            setContent(res.draw());
            setOpen(false);
        } else if (values.showType === 'bar_chart') {
            const res = new BarChartCustom<any>(values.comparing_columns,values.comparing_by);
            setContent(res.draw());
            setOpen(false);
        } else if (values.showType === 'pie_chart') {
            const res = new PieChartCustom<any>(values.comparing_columns,values.comparing_by);
            setContent(res.draw());
            setOpen(false);
        }
    };
    const notify = (text:string) => {
        toast.error(text, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    const onFinishFailed = (errorInfo: any) => {
        for (let error of errorInfo.errorFields) {
            notify(error.errors[0]);
        }
    };
    const onChange = (value: string) => {
        setSelectedSource(value);
        setSourceFieldsOptions([]);
        const filteredData = sourceOptionsColumns.filter((o: any) => o.table_source_id === value);
        setSourceFieldsOptions(filteredData);
        const comparing_by_data = tableSourcesColumns
            .filter((col:any) => col.table_source_id === value && col.is_comparable === 'N')
            .map((col:any) => ({ value: col.column_name, label: col.column_name }));
        setComparingByData(comparing_by_data);
    };
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    }
    const onChangeColumn = (value: Array<string>) => {
        setSelectedItems(value);
        let columns = sourceOptionsColumns.filter((o: any) => o.table_source_id === selectedSource && value.includes(o.column_name) && o.is_filterable === 'Y');
        let com_columns = sourceOptionsColumns.filter((o: any) => o.table_source_id === selectedSource && value.includes(o.column_name) && o.is_comparable === 'Y');
        let res = [];
        let com_res = [];
        for (let column of columns) {
            if (value.includes(column.column_name)) {
                res.push({
                    value: column.column_name,
                    label: column.column_description,
                    disabled: !column.is_filterable
                });
            }
        }
        for (let column of com_columns) {
            if (value.includes(column.column_name)) {
                com_res.push({
                    value: column.column_name,
                    label: column.column_description
                });
            }
        }
        setFilteringColumns(res);
        setComparingColumns(com_res);
    };
    const onChangeShowType = (value: string) => {
        setShowingType(value);
    }
    return (
        <Row gutter={[8, 24]} style={{marginLeft: 0, marginRight: 0}}>
            <ToastContainer />
            <Drawer
        title="Формирование данных"
        placement={"left"}
        closable={false}
        onClose={onClose}
        open={open}
        key={"left"}
        size={"large"}
        extra={
            <Space>
              <Button danger onClick={onClose}>Выход</Button>
            </Space>
          }
      >
        <Row gutter={[8, 24]} style={{marginLeft: 0, marginRight: 0}}>
        <Col span={24}>
                <Form name="basic" initialValues={{remember: true}} onFinish={onFinish} onFinishFailed={onFinishFailed}
                      style={{marginTop: 30}} autoComplete="off">
                    <Form.Item label="Источник" name="source"
                               rules={[{required: true, message: 'Пожалуйста, выберите источник!'}]}>
                        <Select
                            showSearch
                            placeholder="Выберите источник!"
                            onChange={onChange}
                            options={sourceOptions}
                        />
                    </Form.Item>
                    <Form.Item<FieldType> label="Столбцы источника" name="columns" rules={[{
                        required: true,
                        message: 'Пожалуйста, выберите столбцы источника!'
                    }]}>
                        <Select
                            showSearch
                            mode="multiple"
                            placeholder="Выберите столбцы источника!"
                            onChange={onChangeColumn}
                            options={filteredOptions.map((item: any) => ({
                                value: item.column_name,
                                label: item.column_name,
                            }))}
                        />
                    </Form.Item>
                    <Form.Item<FieldType> label="Тип показа" name="showType"
                                          rules={[{required: true, message: 'Пожалуйста, выберите тип показа!'}]}>
                        <Select
                            showSearch
                            placeholder="Выберите тип показа!"
                            onChange={onChangeShowType}
                            options={showingTypesAll.map((item) => ({
                                value: item.value,
                                label: item.label,
                            }))}
                        />
                    </Form.Item>
                    {(showingType !== '' && showingType !== 'table') && (
                        <>
                            <Form.Item<FieldType> label="Сравниваемые столбцы" name="comparing_columns"
                                                  rules={[{
                                                      required: true,
                                                      message: 'Пожалуйста, выберите cравниваемые столбцы!'
                                                  }]}>

                                <Select
                                    showSearch
                                    mode="multiple"
                                    placeholder="Выберите столбцы источника!"
                                    onChange={handleChange}
                                    options={comparingColumns.map((item: any) => ({
                                        value: item.value,
                                        label: item.label,
                                    }))}
                                />
                            </Form.Item>
                            <Form.Item<FieldType> label="Cравнение по" name="comparing_by"
                                                  rules={[{
                                                      required: true,
                                                      message: 'Пожалуйста, выберите сравнение по!'
                                                  }]}>

                                <Select
                                    placeholder="Select a comparing_by column"
                                    options={comparingByData}
                                />
                            </Form.Item>
                        </>
                    )}
                    <Form.List name="filters">
                        {(fields, {add, remove}) => (
                            <>
                                {fields.map(({key, name, ...restField}) => (
                                    <div key={key} style={{display: 'flex', gap: 10}}>
                                        <Form.Item {...restField} name={[name, 'column']}
                                                   rules={[{required: true, message: 'Пожалуйста, выберите столбец!'}]}>
                                            <Select
                                                style={{width: 150}}
                                                options={filteringColumns}
                                                placeholder="Выберите столбец!"
                                            />
                                        </Form.Item>
                                        <Form.Item {...restField} name={[name, 'operator']} rules={[{
                                            required: true,
                                            message: 'Пожалуйста, выберите оператора!'
                                        }]}>
                                            <Select
                                                style={{width: 150}}
                                                options={operators}
                                                placeholder="Выберите оператора!"
                                            />
                                        </Form.Item>
                                        <Form.Item {...restField} name={[name, 'value']}
                                                   rules={[{required: true, message: 'Пожалуйста, введите значение!'}]}>
                                            <Input placeholder="Введите значение"/>
                                        </Form.Item>
                                        <MinusCircleOutlined style={{marginTop: 8}} onClick={() => remove(name)}/>
                                    </div>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                        Добавить строку в фильтр
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <Button ghost type="primary" htmlType="submit">
                            Сформировать
                        </Button>
                    </Form.Item>
                </Form>
                </Col>
                </Row>
                </Drawer>
            <Col span={24}>
            <Button style={{marginTop: '5px'}} icon={<MenuUnfoldOutlined />} onClick={showDrawer}/>
            <Divider />
                {content}
            </Col>
        </Row>
    );
};

export default SourceForm;