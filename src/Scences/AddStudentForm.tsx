import React from "react";
import { connect } from "react-redux";
import { Button, DatePicker, Form, Input, Select, Space, Upload } from 'antd';
import { Student } from "../Models/Student";
import { City } from "../Models/City";
import { UploadOutlined} from '@ant-design/icons'

interface AddStudentProps {
    // formData: Student;
    onSubmit: (student: Student) => void;
    onClose: () => void;
    cities: City[];
    visible: boolean;
}

const AddStudentForm: React.FC<AddStudentProps> = ({ onSubmit, onClose, cities }) => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        onSubmit(values);
        onClose();
        form.resetFields();

    }

    return (
        <Form
            initialValues={{ remember: true }}
            form={form}
            onFinish={onFinish}
            layout="vertical">
            <Form.Item
                name="first_name"
                label="First Name"
                rules={[{ required: true, message: 'Please Enter First Name' }]}
            >
                <Input />

            </Form.Item>
            <Form.Item
                name="last_name"
                label="Last Name"
                rules={[{ required: true, message: 'Please Enter Last Name' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                // initialValue={formData.date_of_birth ? dayjs(formData.date_of_birth) : undefined}
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
                <Form.Item
                    name="img"
                    label="Insert Image"
                    rules={[{ required: false, message: 'Upload a photo (Optional)' }]}
                >
                    <Input  type="file" accept="image/*" name="img"/>
                    
                
                    <Button icon={<UploadOutlined />}>Upload</Button>
            </Form.Item>
            <Form.Item>
                <Space>
                    <Button type="primary" htmlType="submit">
                        Add
                    </Button>
                    <Button onClick={onClose}>
                        Cancel
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
}
const mapStateToProps = (state: any) => {
    return {
        students: state.students.students,
        cities: state.cities.cities,
    }
}
export default connect(mapStateToProps)(AddStudentForm);