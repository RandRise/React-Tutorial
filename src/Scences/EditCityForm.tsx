import React from "react";
import { Form, Input, Button, Space } from 'antd';
import { City } from "../Models/City";

interface EditFormProps {
    city: City;
    onSubmit: (id: number, name: string) => void;
    onClose: () => void;
}

const EditCityForm: React.FC<EditFormProps> = ({ city, onSubmit, onClose }) => {
    const [form] = Form.useForm();

    const onFinish = (values: {id: number, name: string}) => {
        onSubmit(city.id, values.name);
        onClose();
    };

    return (
        <Form
            form={form}
            name="Update City Form"
            initialValues={{ name: city.name}}
            onFinish={onFinish}
            layout="vertical"
        >
            <Form.Item
                name="name"
                label="Edit City Name"
                rules={[{ required: true, message: 'Enter The City Name You Desire' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item>
                <Space>
                    <Button type="primary" htmlType="submit">
                        Update
                    </Button>
                    <Button type="default" onClick={onClose}>
                        Cancel
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};
export default EditCityForm;