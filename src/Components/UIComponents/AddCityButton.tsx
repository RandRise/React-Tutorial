import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'antd';
import AddCityForm from '../../Scences/AddCityForm';
import { ADD_CITY_REQUEST } from '../../Redux/Actions/Types';
interface AddCityButtonProps {
    addCity: (name: string) => void;
}

const AddCityButton: React.FC<AddCityButtonProps> = ({  addCity }) => {
    const [visible, setVisible] = useState(false);

    const handleOpenModal = () => {
        setVisible(true);
    };

    const handleCloseModal = () => {
        setVisible(false);
    };

    const handleAddCity = (name: string) => {
        addCity(name);
        // notification.success({ message: 'City Added Successfully' });

        handleCloseModal();
    };

    return (
        <>
            <Button type="primary" onClick={handleOpenModal}>
                Add New City +
            </Button>
            <Modal
                title="Add City"
                open={visible}
                onCancel={handleCloseModal}
                footer={null}
            >
                <AddCityForm onSubmit={handleAddCity} visible={visible} onClose={handleCloseModal} />
            </Modal>
        </>
    );
};

const mapStateToProps = (state: any) => {
    return {
        city: state.cities.name,
        isLoading: state.cities.isLoading,
        response: state.cities.response,
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        addCity: (name: string) => dispatch({ type: ADD_CITY_REQUEST, payload: name }),
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(AddCityButton);
