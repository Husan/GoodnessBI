import axios from "axios";
import {ISendingDataToServer} from "../../types/typings";

export const getTableSources = async (data:ISendingDataToServer) => {
    try {
        const response: any = await axios.post('http://95.181.224.113:9595/api/public/query',data,
            {
                headers: {
                    'Content-Type':'application/json;charset=utf-8',
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Credentials':'true',
                    'withCredentials': true
                },
                withCredentials: false
            }
        );

        return response.data;
    } catch (error: any) {
        throw error;
    }
};
export const getTableSourcesColumns = async (data:ISendingDataToServer) => {
    try {
        const response: any = await axios.post('http://95.181.224.113:9595/api/public/query',data,
            {
                headers: {
                    'Content-Type':'application/json;charset=utf-8',
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Credentials':'true',
                    'withCredentials': true
                },
                withCredentials: false
            }
        );

        return response.data;
    } catch (error: any) {
        throw error;
    }
};
export const getData = async (data:ISendingDataToServer) => {
    try {
        const response: any = await axios.post('http://95.181.224.113:9595/api/public/query',data,
            {
                headers: {
                    'Content-Type':'application/json;charset=utf-8',
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Credentials':'true',
                    'withCredentials': true
                },
                withCredentials: false
            }
        );

        return response.data;
    } catch (error: any) {
        throw error;
    }
};