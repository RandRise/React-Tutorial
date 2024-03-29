import React, { useState } from "react";
import { connect } from 'react-redux';
import { Button, Modal } from 'antd';
import EditCityForm from "../../Scences/EditCityForm";
import { EDIT_CITY_REQUEST } from "../../Redux/Actions/Types";
import { City } from "../../Models/City";
interface EditCityButtonProps {
    city: City;
    editCity: (id: number, name: string) => void;
}

const EditCityButton: React.FC<EditCityButtonProps> = ({ city, editCity }) => {
    const [visible, setVisible] = useState(false);

    const handleOpenModal = () => {
        setVisible(true);
    };

    const handleCloseModal = () => {
        setVisible(false);
    };

    const handleEditCity = (id: number, name: string) => {
        editCity(id, name);
        handleCloseModal();
    };
    return (
        <>
            <Button type="primary" onClick={handleOpenModal}>
                Edit
            </Button>
            <Modal
                title="Edit City"
                open={visible}
                onCancel={handleCloseModal}
                footer={null}
            >
                <EditCityForm city={city} onSubmit={handleEditCity} onClose={handleCloseModal} />
            </Modal>
        </>
    );
};


const mapStateToProps = (state: any) => {
    return { 
        response: state.cities.response,

    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        editCity: (id: number, name: string) => dispatch({ type: EDIT_CITY_REQUEST, payload: { id, name } })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCityButton);