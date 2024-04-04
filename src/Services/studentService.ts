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

    static async deleteStudentService(student_id: number): Promise<ICommonResponse> {
        try {
            const response = await axios.delete<ICommonResponse>(`${StudentAPI}/${student_id}`)
            return response.data;
        } catch (error) {
            console.log('Error Deleting Student Record', error)
            return {
                statusCode: 500,
                message: 'Failed to Add',
                exception: error,
                result: [],
            }
        }
    }
    static async addStudentService(student: Student): Promise<ICommonResponse> {
        try {

            var formData = new FormData();
            formData.append("first_name", student.first_name);
            formData.append("last_name", student.last_name);
            formData.append("date_of_birth", student.date_of_birth);
            formData.append("city_of_birth_id", student.city_of_birth_id.toString());
            formData.append("img", student.img);
            console.log("Image Requested", student.img.toString());

            const response = await axios.post(StudentAPI, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error adding student:', error);
            throw error;
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