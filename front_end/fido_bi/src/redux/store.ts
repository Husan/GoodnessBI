import {combineReducers, configureStore} from "@reduxjs/toolkit";

import createSagaMiddleware from 'redux-saga';
import {rootSaga} from "./sagas";
import mainSlice from "./slices/mainSlice";

const sagaMiddleware = createSagaMiddleware();
const reducer = combineReducers({
    mainSlice
});

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: false}).concat(sagaMiddleware)
});
sagaMiddleware.run(rootSaga);