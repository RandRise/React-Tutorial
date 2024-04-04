import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Space, Table, notification } from 'antd';
import { Student } from "../Models/Student";
import { FETCH_STUDENTS_REQUEST } from "../Redux/Actions/Types";
import EditStudentButton from "../Components/UIComponents/EditStudentButton";
import { City } from "../Models/City";
import { ICommonResponse } from "../Components/common/CommonInterfaces";
import AddStudentButton from "../Components/UIComponents/AddStudentButton";


interface StudentTableProps {
    students: Student[];
    fetchStudents: () => any;
    onSubmit: (student: Student) => any;
    city: City
    response: ICommonResponse;
}

const StudentTable: React.FC<StudentTableProps> = (props: StudentTableProps) => {
    useEffect(() => {
        props.fetchStudents();
    }, []);

    useEffect(() => {
        if (props.response) {
            (props.response?.statusCode === 200) ?
                notification.success({ message: props.response?.message })
                :
                notification.error({ message: props.response?.message })
        }
    }, [props.response])
    const columns = [
        // {
        //     title: "Student ID",
        //     dataIndex: "student_id",
        //     key: "student_id",
        // },
        {
            title: "Profile Photo",
            dataIndex: "img",
            key: "img",
            render: (text: any, record: Student) =>
                record.img ? (
                    <img src={`data:image/png;base64, ${record.img}`} style={{width: '64px', height: '64px'}} />
                ) : null
            
        },
        {
            title: "Full Name",
            dataIndex: "full_name",
            key: "full_name",
            render: (text: any, record: Student) => (record.first_name + ' ' + record.last_name)
        },
        {
            title: "City Of Birth",
            dataIndex: "city_of_birth",
            key: "city_of_birth",
        },
        {
            title: "Date Of Birth",
            dataIndex: "date_of_birth",
            key: "date_of_birth",
            // render: (record: Student) => { return dayjs(record.date_of_birth).format('YYYY-MM-DD') }
        },
        {
            title: "Actions",
            key: "actions",
            render: (text: any, record: Student) => (
                <>
                    <Space>
                        <EditStudentButton student={record} />
                    </Space>
                </>
            )
        }

    ];
    return (
        <div>
            <AddStudentButton />
            <Table dataSource={props.students} columns={columns} rowKey="student_id">

            </Table>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        students: state.students.students,
        isLoading: state.students.isLoading,
        response: state.students.response,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchStudents: () => dispatch({ type: FETCH_STUDENTS_REQUEST })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentTable);

