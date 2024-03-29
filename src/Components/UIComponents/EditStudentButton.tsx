import React, { useState } from "react";
import { connect } from 'react-redux';
import { Button, Modal } from 'antd';
import EditStudentForm from "../../Scences/EditStudentForm";
import { EDIT_STUDENT_REQUEST } from "../../Redux/Actions/Types";
import { Student } from "../../Models/Student";
interface EditStudentButtonProps {
    student: Student;
    editStudent: (student: Student) => void;
}

const EditStudentButton: React.FC<EditStudentButtonProps> = ({ student, editStudent }) => {
    const [visible, setVisible] = useState(false);

    const handleOpenModal = () => {
        setVisible(true);
    };

    const handleCloseModal = () => {
        setVisible(false);
    };

    const handleEditStudent = (student: Student) => {
        console.log("Updated student: ", student)
        editStudent(student);
        handleCloseModal();
    };
    return (
        <>
            <Button type="primary" onClick={handleOpenModal}>
                Edit
            </Button>
            <Modal
                title="Edit Student"
                open={visible}
                onCancel={handleCloseModal}
                footer={null}
            >
                <EditStudentForm formData={student} onSubmit={handleEditStudent} onClose={handleCloseModal} />
            </Modal>
        </>
    );
};

const mapStateToProps = (state: any) => {
    return {
        cities: state.cities.cities,
        students: state.students.students,
        response: state.students.response,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        editStudent: (student: Student) => dispatch({ type: EDIT_STUDENT_REQUEST, payload: { student } })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditStudentButton);