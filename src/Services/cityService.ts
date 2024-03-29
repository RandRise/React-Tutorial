//API calls related to cities
import axios from "axios";
import { ICommonResponse } from "../Components/common/CommonInterfaces";
const CityAPI = 'http://localhost:3001/api/city';

export class CityServices {
    static async fetchCities(): Promise<ICommonResponse> {
        try {
            const response = await axios.get<ICommonResponse>(CityAPI);
            return response.data;
        } catch (error) {
            console.error('Error fetching Cities', error)
            return {
                statusCode: 500,
                message: 'Failed to fetch',
                exception: error,
                result: [],
            };
        }


    }
    static async addCityService (name: string): Promise<ICommonResponse>{
        // console.log("ADD CITY SERVICE", name);
        try {
            const response = await axios.post<ICommonResponse>(CityAPI, name)
            return response.data;
        }catch (error) {
            console.error('Error Adding City', error)
            return {
                statusCode: 500,
                message: 'Failed to Add',
                exception: error,
                result: [],
            }
        }
    }

    static async deleteCityService(id: number): Promise<ICommonResponse>{
        try {
            const response = await axios.delete<ICommonResponse>(`${CityAPI}/${id}`)
            return response.data;
        }catch(error) {
            console.log('Error Deleting City', error)
            return {
                statusCode: 500,
                message: 'Failed to Add',
                exception: error,
                result: [],
            }
        }
    }

    static async editCityService(id: number, name:string): Promise<ICommonResponse>{
        try{
            const response = await axios.put<ICommonResponse>(`${CityAPI}/${id}`, {name})
            return response.data;
        }catch(error) {
            console.error('Error Updating City', error)
            return {
                statusCode: 500,
                message: 'Failed to Add',
                exception: error,
                result: [],
            }
        }
    }
}