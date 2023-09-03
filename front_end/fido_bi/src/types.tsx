import React, {useEffect} from "react";
import CustomTable from "./components/CustomTable";
import CustomLineChart from "./components/CustomLineChart";
import CustomBarChart from "./components/CustomBarChart";
import CustomPieChart from "./components/CustomPieChart";
export interface IResult<T> {
    comparing_columns?: Array<T>;
    comparing_by?: Array<T> | string;
    draw: () => React.ReactNode;
}
export const generateColor = ():string => {
    const colorsArray = ["#8884d8", "#82ca9d", '#0088FE', '#00C49F', '#FFBB28', '#FF8042',"#3498db", "#e74c3c", "#2ecc71", "#f39c12"];
    const randomIndex = Math.floor(Math.random() * colorsArray.length);
    return colorsArray[randomIndex];
}
export class Table<T> implements IResult<T> {
    draw(): React.ReactNode {
        return <CustomTable key={Math.random()} />;
    }
}

export class LineChartCustom<T extends any> implements IResult<T> {
    private _comparing_columns: Array<T> = [];
    private _comparing_by: Array<T> | string = [];

    constructor(comparing_columns: Array<T>, comparing_by: Array<T> | string) {
        this._comparing_columns = comparing_columns;
        this._comparing_by = comparing_by;
    }


    get comparing_columns(): Array<T> {
        return this._comparing_columns;
    }

    set comparing_columns(value: Array<T>) {
        this._comparing_columns = value;
    }

    get comparing_by(): Array<T>| string {
        return this._comparing_by;
    }

    set comparing_by(value: Array<T>| string) {
        this._comparing_by = value;
    }

    draw(): React.ReactNode {
        return <CustomLineChart comparing_columns={this.comparing_columns} comparing_by={this.comparing_by}/>;
    }
}
export class BarChartCustom<T extends any> implements IResult<T> {
    private _comparing_columns: Array<T> = [];
    private _comparing_by: Array<T> | string = [];

    constructor(comparing_columns: Array<T>, comparing_by: Array<T> | string) {
        this._comparing_columns = comparing_columns;
        this._comparing_by = comparing_by;
    }


    get comparing_columns(): Array<T> {
        return this._comparing_columns;
    }

    set comparing_columns(value: Array<T>) {
        this._comparing_columns = value;
    }

    get comparing_by(): Array<T> | string {
        return this._comparing_by;
    }

    set comparing_by(value: Array<T> | string) {
        this._comparing_by = value;
    }

    draw(): any {
        return <CustomBarChart comparing_columns={this.comparing_columns} comparing_by={this.comparing_by}/>;
    }
}
export class PieChartCustom<T extends any> implements IResult<T> {
    private _comparing_columns: Array<T> = [];
    private _comparing_by: Array<T> | string = [];

    constructor(comparing_columns: Array<T>, comparing_by: Array<T> | string) {
        this._comparing_columns = comparing_columns;
        this._comparing_by = comparing_by;
    }

    get comparing_columns(): Array<T> {
        return this._comparing_columns;
    }

    set comparing_columns(value: Array<T>) {
        this._comparing_columns = value;
    }

    get comparing_by(): Array<T> | string {
        return this._comparing_by;
    }

    set comparing_by(value: Array<T> | string) {
        this._comparing_by = value;
    }

    draw(): React.ReactNode {
        return <CustomPieChart comparing_columns={this.comparing_columns} comparing_by={this.comparing_by}/>;
    }
}