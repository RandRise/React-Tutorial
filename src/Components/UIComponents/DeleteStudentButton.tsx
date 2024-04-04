import React from "react";
import { connect } from "react-redux";
import { Button, Popconfirm } from "antd";
import { DELETE_STUDENT_REQUEST } from "../../Redux/Actions/Types";


interface DeleteStudentButtonProps {
    sId: number
    deleteStudent: (sId: number) => void;
}

const DeleteStudentButton: React.FC<DeleteStudentButtonProps> = (props) => {
    const handleDelete = () => {
        props.deleteStudent(props.sId);
    }
    return (
        <Popconfirm
            title="Are You Sure?"
            onConfirm={() => handleDelete()}
            okText="Yes"
            cancelText="Cancel">
            <Button
                type="primary" danger>
                Delete
            </Button>
        </Popconfirm>
    );
};

const mapStateToProps = (state: any) => ({
    response: state.students.response,
    isLoading: state.students.isLoading
})
const mapDispatchToProps = (dispatch: any) => {
    return {
        deleteStudent: (sId: number) => dispatch({ type: DELETE_STUDENT_REQUEST, payload: sId })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteStudentButton);