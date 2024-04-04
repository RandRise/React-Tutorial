import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, DatePicker, Form, Input, Select, Space, Upload } from 'antd';
import { Student } from "../Models/Student";
import { City } from "../Models/City";
import { UploadOutlined } from '@ant-design/icons'

interface AddStudentProps {
    onSubmit: (student: Student) => void;
    onClose: () => void;
    cities: City[];
    visible: boolean;
}

const AddStudentForm: React.FC<AddStudentProps> = ({ onSubmit, onClose, cities }) => {
    const [form] = Form.useForm();
    const [image, setImage] = useState<any>()


    const onFinish = (values: any) => {
        const student: Student = { ...values, img: image };
        onSubmit(student);
        onClose();
        form.resetFields();
        setImage(null);

    }
    const handleImageChange = (info: any) => {
        const { fileList } = info;
        if (fileList.length > 0) {
            const file = fileList[0].originFileObj;
            setImage(file);
        }
    };


    console.log("Base64Image", image)

    return (
        <Form
            initialValues={{ remember: true }}
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
