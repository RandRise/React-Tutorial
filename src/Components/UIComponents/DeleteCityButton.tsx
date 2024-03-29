import React from "react";
import { connect } from "react-redux";
import { Button, Popconfirm } from "antd";
import { DELETE_CITY_REQUEST } from "../../Redux/Actions/Types";

interface DeleteCityButtonProps {
    deleteCity: (cityId: number) => void;
    cityId: number;
    isLoading: boolean;
    // error: any;

}


const DeleteCityButton: React.FC<DeleteCityButtonProps> = ({ isLoading, deleteCity, cityId }) => {
    const handleDelete = () => {
        deleteCity(cityId);
    };


    return (
        <Popconfirm
            title="Are you sure?"
            onConfirm={() => handleDelete()}
            okText="Yes"
            cancelText="No">

            <Button type='primary' danger disabled={isLoading} >
                Delete
            </Button>
        </Popconfirm>
    );
};

const mapStateToProps = (state: any) => ({
    isLoading: state.cities.isLoading,
    response: state.cities.response, //Steps for handling response
})

const mapDispatchToProps = (dispatch: any) => {
    return {

        deleteCity: (cityId: number) => dispatch({ type: DELETE_CITY_REQUEST, payload: cityId }),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DeleteCityButton);