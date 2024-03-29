import React from "react";
import { connect } from "react-redux";
import { Button, Form, Input, DatePicker, Select, Space } from 'antd';
import { Student } from "../Models/Student";
import { City } from "../Models/City";
import dayjs from "dayjs";
interface EditFormProps {
    formData: Student;
    onSubmit: (student: Student) => void;
    onClose: () => void;
    cities: City[];

}

const EditStudentForm: React.FC<EditFormProps> = ({ formData, onSubmit, onClose, cities }) => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        const student: Student = {
            ...values,
            date_of_birth: values.date_of_birth.format('YYYY-MM-DD'),
            student_id: formData.student_id
        };
        console.log("Date of birth", values.date_of_birth)
        onSubmit(student);
        onClose();
    }



    return (
        <Form
            autoComplete="off"
            form={form}
            onFinish={onFinish}
            layout="vertical"
        >
            <Form.Item
                initialValue={formData.first_name}
                name="first_name"
                label="First Name"
                rules={[{ required: true, message: 'Please Enter First Name' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                initialValue={formData.last_name}

                name="last_name"
                label="Last Name"
                rules={[{ required: true, message: 'Please Enter Last Name' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                initialValue={formData.date_of_birth ? dayjs(formData.date_of_birth) : undefined}
                name="date_of_birth"
                label="Date Of Birth"

            >
                <DatePicker

                    style={{ width: '100%' }}
                    format="YYYY-MM-DD"
                // value={formData.date_of_birth ? new Date(formData.date_of_birth) : null}

                />
            </Form.Item>
            <Form.Item
                initialValue={formData.city_of_birth_id}
                name="city_of_birth_id"
                label="City of Birth"
                rules={[{ required: true, message: 'Please Select City' }]}
            >
                <Select>
                    {cities.map(city => (
                        <Select.Option key={city.id} value={city.id}>{city.name}</Select.Option>
                    ))}
                </Select>

            </Form.Item>
            <Form.Item>
                <Space>
                    <Button type="primary" htmlType="submit" >
                        Submit
                    </Button>
                    <Button onClick={onClose} >
                        Cancel
                    </Button>
                </Space>
            </Form.Item>
        </Form>

    )

}
const mapStateToProps = (state: any) => {
    return {
        cities: state.cities.cities,
        students: state.students.students,
    };
};


export default connect(mapStateToProps)(EditStudentForm);