import React from "react";
import { Form, Input, Button, Space } from 'antd';

interface FormProps {
    onSubmit: (values: any) => void;
    onClose: () => void;
    visible: boolean;
}

const AddCityForm: React.FC<FormProps> = ({ onSubmit, onClose }) => {
    const [form] = Form.useForm();
    // console.log("ADD CITY FORM", AddCityForm);
    const onFinish = (values: any) => {
        onSubmit(values);

        onClose();
        form.resetFields();
    };

    return (
        <Form
            form={form}
            name="Add City Form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
        >
            <Form.Item
                name="name"
                label="City Name"
                rules={[{ required: true, message: 'Please enter city name' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item>
                <Space>
                    <Button type="primary" htmlType="submit">
                        Add City
                    </Button>
                    <Button type="primary" onClick={onClose} >
                        Cancel
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    )
};

export default AddCityForm;