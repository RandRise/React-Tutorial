import { ICommonResponse } from "../Components/common/CommonInterfaces";
import { Student } from "../Models/Student";
export interface StudentState {
    isLoading: boolean;
    students: Student[];
    response: ICommonResponse | null;
    
}