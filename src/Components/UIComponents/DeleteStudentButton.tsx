import React from "react";

interface DeleteStudentButtonProps {
    sId: number
    deleteStudent: (sId: number) => void;
}

const DeleteStudentButton:React.FC<DeleteStudentButtonProps> = (props) => {
    const handleDelete = () => {
        props.deleteStudent(props.sId);
    }
    return (
        <div>
            
        </div>
    )
}