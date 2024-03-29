import { put, takeEvery, all } from 'redux-saga/effects';
import { StudentServices } from '../../Services/studentService';
import {
    ADD_STUDENT_REQUEST,
    ADD_STUDENT_SUCCESS,
    EDIT_STUDENT_REQUEST,
    EDIT_STUDENT_SUCCESS,
    FETCH_STUDENTS_REQUEST,
    FETCH_STUDENTS_SUCCESS,
    GET_GENERAL_RESPONSE
} from '../Actions/Types';


function* getStudentsFetch(): Generator<any, void, any> {
    const students = yield StudentServices.fetchStudents()
        .then(e => e.result);
    yield put({ type: FETCH_STUDENTS_SUCCESS, students })
}

function* addStudentSaga(action: any): Generator<any, void, any> {
    try {
        const { student } = action.payload;
        const response = yield StudentServices.addStudentService(student)
        if (response.statusCode === 200) {
            yield put({ type: ADD_STUDENT_SUCCESS, payload: response })
            yield put({ type: FETCH_STUDENTS_REQUEST });
        } else {
            yield put({ type: GET_GENERAL_RESPONSE, payload: response })
        }
    } catch(error) {
        console.log("ERROR adding Student", error)
    }
}

function* editStudentSaga(action: any): Generator<any, void, any> {
    try {
        const { student } = action.payload;
        const response = yield StudentServices.editStudentService(student);
        if (response.statusCode === 200) {
            yield put({ type: EDIT_STUDENT_SUCCESS, payload: response });
            yield put({ type: FETCH_STUDENTS_REQUEST });
        } else {
            yield put({ type: GET_GENERAL_RESPONSE, payload: response })
        }

    } catch (error) {
        console.log("Error Updating Student", error);
    }
}

function* watchAddStudentSaga(): Generator<any,void,any> {
    yield takeEvery(ADD_STUDENT_REQUEST, addStudentSaga)
}

function* watchEditStudentSaga(): Generator<any, void, any> {
    yield takeEvery(EDIT_STUDENT_REQUEST, editStudentSaga)
}

function* watchStudentsFetchSaga(): Generator<any, void, any> {
    yield takeEvery(FETCH_STUDENTS_REQUEST, getStudentsFetch)
}

export default function* StudentSaga() {
    yield all([
        watchStudentsFetchSaga(),
        watchEditStudentSaga(),
        watchAddStudentSaga(),
    ]);
};