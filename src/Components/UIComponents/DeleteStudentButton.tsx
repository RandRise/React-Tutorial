import React from "react";

interface DeleteStudentButtonProps {
    sId: number
    deleteStudent: (sId: number) => void;
    isLoading: boolean;
}