import { StudentState } from "../../States/StudentState";
import {
    FETCH_STUDENTS_SUCCESS,
    EDIT_STUDENT_SUCCESS,
    ADD_STUDENT_SUCCESS
} from "../Actions/Types";

const initialState: StudentState = {
    students: [],
    isLoading: false,
    response: null,
};

const studentsReducer = (state = initialState, action: any): StudentState => {
    switch (action.type) {
        case FETCH_STUDENTS_SUCCESS:
            return { ...state, students: action.students, isLoading: false }
        case EDIT_STUDENT_SUCCESS:
            return { ...state, isLoading: false, response: action.payload }
        case ADD_STUDENT_SUCCESS:
            return { ...state, isLoading: false, response: action.payload }
        default:
            return { ...state };
    };
};

export default studentsReducer;