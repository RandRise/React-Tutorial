import axios from "axios";
import { ICommonResponse } from "../Components/common/CommonInterfaces";
import { Student } from "../Models/Student";
const StudentAPI = 'http://localhost:3001/api/student';

export class StudentServices {
    static async fetchStudents(): Promise<ICommonResponse> {
        try {
            const response = await axios.get<ICommonResponse>(StudentAPI);
            return response.data;
        } catch (error) {
            console.error('Error fetching students', error)
            return {
                statusCode: 500,
                message: 'Failed to fetch',
                exception: error,
                result: [],
            }
        }
    }
    static async addStudentService(student: Student): Promise<ICommonResponse> {
        try{
            const response = await axios.post<ICommonResponse>(StudentAPI, student)
            return response.data;

        }catch(error) {
            console.error('ERROR adding student', error)
            return {
                statusCode: 500,
                message: 'Failed to add',
                exception: error,
                result: [],
            }
        }
    }

    static async editStudentService(student: Student): Promise<ICommonResponse> {
        try {
            const response = await axios.put<ICommonResponse>(`${StudentAPI}/${student.student_id}`, student)
            return response.data;
        } catch (error) {
            console.error('Error editing student', error);
            return {
                statusCode: 500,
                message: 'Failed to fetch',
                exception: error,
                result: [],
            };
        };
    };
};