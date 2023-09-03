import {createSlice} from "@reduxjs/toolkit";

const initialState: { data: Array<any>,loading: boolean, error: object,tableSources: Array<any>,tableSourcesColumns: Array<any>} = {
    data: [],
    tableSources: [],
    tableSourcesColumns: [],
    loading: true,
    error: {}
};
const mainSlice = createSlice({
    name: 'mainSlice',
    initialState,
    reducers: {
        putData: (state, action) => {
            state.data = action.payload;
            return state;
        },
        putTableSources: (state, action) => {
            state.tableSources = action.payload;
            return state;
        },
        putTableSourcesColumns: (state, action) => {
            state.tableSourcesColumns = action.payload;
            return state;
        },
        putLoading: (state, action) => {
            state.loading = action.payload;
            return state;
        },
        putError: (state, action) => {
            state.error = action.payload;
            return state;
        }
    }
});
export const {putTableSources,putTableSourcesColumns,putLoading,putError,putData} = mainSlice.actions;
export default mainSlice.reducer;