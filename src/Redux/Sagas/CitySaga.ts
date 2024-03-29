//Sagas for HANDLING city-related side effects
import { put, takeEvery, all } from 'redux-saga/effects';
import { CityServices } from "../../Services/cityService";
import {
    FETCH_CITIES_REQUEST,
    FETCH_CITIES_SUCCESS,
    ADD_CITY_REQUEST,
    ADD_CITY_SUCCESS,
    DELETE_CITY_REQUEST,
    DELETE_CITY_SUCCESS, EDIT_CITY_SUCCESS,
    EDIT_CITY_REQUEST,
    FETCH_CITIES_FAILURE,
    DELETE_CITY_FAILURE,
    FETCH_STUDENTS_REQUEST,
    GET_GENERAL_RESPONSE
} from "../Actions/Types";


function* getCitiesFetch(): Generator<any, void, any> {
    try {

        const cities = yield CityServices.fetchCities().then(r => r.result);
        yield put({ type: FETCH_CITIES_SUCCESS, cities })
    } catch (error) {
        yield put({ type: FETCH_CITIES_FAILURE, error });
    }
}

function* addCitySaga(action: any): Generator<any, void, any> {
    try {
        const response = yield CityServices.addCityService(action.payload);
        if (response.statusCode === 200) {
            yield put({ type: ADD_CITY_SUCCESS, payload: response })
            yield put({ type: FETCH_CITIES_REQUEST });
        }
        else {
            yield put({ type: GET_GENERAL_RESPONSE, payload: response })
        }
    } catch (error) {
        console.log("Error adding City", error);
    }
}
function* deleteCitySaga(action: any): Generator<any, void, any> {
    try {
        const response = yield CityServices.deleteCityService(action.payload);
        if (response.statusCode === 200) {
            yield put({ type: DELETE_CITY_SUCCESS, payload: response })
            yield put({ type: FETCH_CITIES_REQUEST });

        }
        else {
            yield put({ type: GET_GENERAL_RESPONSE, payload: response }) //Step to handle response (can make it general action)
        }
    } catch (error) {
        yield put({ type: DELETE_CITY_FAILURE, payload: error });
        // notification.error({ message: `Failed to delete a city: ${error}` })
    }
}

function* editCitySaga(action: any): Generator<any, void, any> {
    try {

        const { id, name } = action.payload
        const response = yield CityServices.editCityService(id, name);
        if ( response.statusCode === 200 ) {
            yield put({ type: EDIT_CITY_SUCCESS, payload: response });
            yield put({ type: FETCH_CITIES_REQUEST });
            yield put({ type: FETCH_STUDENTS_REQUEST })

        }else {
            yield put ({ type: GET_GENERAL_RESPONSE, payload: response})
        }
    } catch (error) {
        console.log("Error updating city", error);
    }
}

function* watchEditCitySaga(): Generator<any, void, any> {
    yield takeEvery(EDIT_CITY_REQUEST, editCitySaga);
}

function* watchDeleteCitySaga(): Generator<any, void, any> {
    yield takeEvery(DELETE_CITY_REQUEST, deleteCitySaga);
}

function* watchAddCitySaga(): Generator<any, void, any> {
    yield takeEvery(ADD_CITY_REQUEST, addCitySaga);
}

function* fetchCitiesSaga(): Generator<any, void, any> {
    yield takeEvery(FETCH_CITIES_REQUEST, getCitiesFetch);

}


export default function* CitySaga() {
    yield all([
        fetchCitiesSaga(),
        watchAddCitySaga(),
        watchDeleteCitySaga(),
        watchEditCitySaga(),
    ]);
};