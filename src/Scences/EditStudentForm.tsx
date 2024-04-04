import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, DatePicker, Form, Input, Select, Space, Upload } from 'antd';
import { Student } from "../Models/Student";
import { City } from "../Models/City";
import { UploadOutlined } from '@ant-design/icons';
import dayjs from "dayjs";

interface EditStudentFormProps {
    formData: Student;
    onSubmit: (student: Student) => void;
    onClose: () => void;
    cities: City[];
}

const EditStudentForm: React.FC<EditStudentFormProps> = ({ formData, onSubmit, onClose, cities }) => {
    const [form] = Form.useForm();
    const [image, setImage] = useState<any>();

    const onFinish = (values: any) => {
        const student: Student = {
            ...values,
            date_of_birth: dayjs(values.date_of_birth).format('YYYY-MM-DD'),
            student_id: formData.student_id,
            img: image
        };
        onSubmit(student);
        onClose();
    }


    const handleImageChange = (info: any) => {
        const { fileList } = info;
        if (fileList.length > 0) {
            const file = fileList[0].originFileObj;
            setImage(file);
        }
    };

    return (
        <Form
            initialValues={{ ...formData, date_of_birth: formData.date_of_birth ? dayjs(formData.date_of_birth) : undefined }}
            form={form}
            onFinish={onFinish}
            layout="vertical"
        >
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
                name="date_of_birth"
                label="Date Of Birth"
            >
                <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
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
                <Upload
                    name="img"
                    accept="image/*"
                    listType="picture"
                    maxCount={1}
                    beforeUpload={() => false}
                    onChange={handleImageChange}
                >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
            </Form.Item>
            <Form.Item>
                <Space>
                    <Button type="primary" htmlType="submit">
                        Edit
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
        cities: state.cities.cities,
    }
}

export default connect(mapStateToProps)(EditStudentForm);
