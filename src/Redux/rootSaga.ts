import { all } from "redux-saga/effects";
import CitySaga from "./Sagas/CitySaga";
import StudentSaga from "./Sagas/StudentSaga";
export default function* rootSaga() {
    yield all([
        CitySaga(),
        StudentSaga(),
    ])
}