import rootSaga from "./rootSaga";
import citiesReducer from "./Reducers/CityReducer";
import { createStore, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import studentsReducer from "./Reducers/StudentReducer";

const rootReducer = combineReducers({
    cities: citiesReducer,
    students: studentsReducer,
})

const sagaMiddleware = createSagaMiddleware();
let middleware = [sagaMiddleware];
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

sagaMiddleware.run(rootSaga);

export default store;