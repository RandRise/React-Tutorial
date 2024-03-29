import { ICommonResponse } from "../Components/common/CommonInterfaces";
import { City } from "../Models/City";

export interface CityState {
    isLoading:boolean;
    cities: City[];
    response: ICommonResponse | null; //a step to handle response is to add it to the state
}