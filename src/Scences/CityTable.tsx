import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Space, Table, notification } from 'antd';
import { City } from '../Models/City';
import { FETCH_CITIES_REQUEST } from '../Redux/Actions/Types';
import DeleteCityButton from '../Components/UIComponents/DeleteCityButton';
import EditCityButton from '../Components/UIComponents/EditCityButton';
import { ICommonResponse } from '../Components/common/CommonInterfaces';
import AddCityButton from '../Components/UIComponents/AddCityButton';
interface CityTableProps {
  cities: City[];
  fetchCities: () => any;
  response: ICommonResponse;
}

const CityTable: React.FC<CityTableProps> = (props: CityTableProps) => {
  useEffect(() => {
    props.fetchCities();
  }, []);

  //Step to handle response logically in the component
  useEffect(() => {
    if (props.response) {
      (props.response?.statusCode === 200) ?
        notification.success({ message: props.response?.message })

        : notification.error({ message: props.response?.message })
    }
  }, [props.response])

  const columns = [
    {
      title: 'City Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'City ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: any, record: City) => (
        <>
          <Space>
            <DeleteCityButton cityId={record.id} />
            <EditCityButton city={record} />
          </Space>
        </>
      )
    }
  ];
  // console.log('CITIESSS', props.cities)
  return (
    <div>
      <AddCityButton />
      <Table dataSource={props.cities} columns={columns} rowKey="id" />
      <p>{props.response?.message}</p>
    </div>
  );
};

const mapStateToProps = (state: any) => {

  return {
    cities: state.cities.cities,
    isLoading: state.cities.isLoading,
    response: state.cities.response, //Steps for handling error
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchCities: () => dispatch({ type: FETCH_CITIES_REQUEST }),

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CityTable);
