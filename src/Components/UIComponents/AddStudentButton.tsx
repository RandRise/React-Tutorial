import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Modal } from 'antd';
import { Student } from "../../Models/Student";
import AddStudentForm from "../../Scences/AddStudentForm";
import { ADD_STUDENT_REQUEST } from "../../Redux/Actions/Types";

interface AddStudentButtonProps {
    // student: Student;
    addStudent: (student: Student) => void;
    // onSubmit: (student: Student) => void;

}

const AddStudentButton: React.FC<AddStudentButtonProps> = ({ addStudent }) => {
    const [visible, setVisible] = useState(false);

    const handleOpenModal = () => {
        setVisible(true);
    }
    const handleCloseModal = () => {
        setVisible(false);
    }
    const handleAddStudent = (student: Student) => {
        addStudent(student)
        handleCloseModal();
    }
    return (
        <>
            <Button type="primary" onClick={handleOpenModal}>
                Add New Student +
            </Button>
            <Modal
                title="Create New Student"
                open={visible}
                onCancel={handleCloseModal}
                footer={null}
            >
                <AddStudentForm onSubmit={handleAddStudent} visible={visible} onClose={handleCloseModal} />

            </Modal>
        </>
    );
};

const mapStateToProps = (state: any) => {
    return {
        students: state.students.students,
        response: state.students.response,
        cities: state.cities.cities,
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        addStudent: (student: Student) => dispatch({ type: ADD_STUDENT_REQUEST, payload: { student } })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddStudentButton);