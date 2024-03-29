import { CityState } from "../../States/CityStates";
import { FETCH_CITIES_SUCCESS, ADD_CITY_SUCCESS, DELETE_CITY_SUCCESS, EDIT_CITY_SUCCESS, GET_GENERAL_RESPONSE } from "../Actions/Types";

//Reducer for city state
const initialState: CityState = {
    cities: [],
    isLoading: false,
    response: null
};

const citiesReducer = (state = initialState, action: any): CityState => {
    switch (action.type) {
        case FETCH_CITIES_SUCCESS:
            return { ...state, cities: action.cities, isLoading: false, response: action.payload }

        case ADD_CITY_SUCCESS:
            return { ...state, isLoading: false, response: action.payload }

        case DELETE_CITY_SUCCESS:
            return { ...state, isLoading: false, response: action.payload }

        case GET_GENERAL_RESPONSE:
            return { ...state, response: action.payload }

        case EDIT_CITY_SUCCESS:
            return { ...state, isLoading: false, response: action.payload }

        default:
            return { ...state };
    }
}
export default citiesReducer;