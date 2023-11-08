import axios from 'axios';
import {
  GET_ALL_DRIVERS,
  GET_DRIVER_BY_NAME,
  GET_TEAMS,
  SET_CURRENT_PAGE,
  FILTER_DRIVERS,
  ORDER_DRIVERS,
  POST_DRIVERS, 
} from './action_types';

const URL_BASE = 'http://localhost:3001/drivers';

// Action creators
export const getAllDrivers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(URL_BASE);
      dispatch({
        type: GET_ALL_DRIVERS,
        payload: response.data,
      });
    } catch (error) {
      // Manejo de errores
      console.error('Error en getAllDrivers:', error);
    }
  };
};

export const getDriverByName = (name) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_BASE}/?name=${name}`);
      dispatch({
        type: GET_DRIVER_BY_NAME,
        payload: response.data,
      });
    } catch (error) {
      // Manejo de errores
      console.error('Error en getDriverByName:', error);
    }
  };
};

export const getTeams = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('http://localhost:3001/teams');
      dispatch({
        type: GET_TEAMS,
        payload: data,
      });
    } catch (error) {
      // Manejo de errores
      console.error('Error en getTeams:', error);
    }
  };
};

export const createDrivers = (driver) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('http://localhost:3001/drivers', driver);
      // Aquí puedo manejar la respuesta del servidor si es necesario
      dispatch({
        type: POST_DRIVERS, 
        payload: data,
      });
    } catch (error) {
      // Manejo de errores
      console.error('Error en createDrivers:', error);
    }
  };
};

export const setCurrentPage = (page) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: page,
  };
};

export const filterDrivers = (team, source, order) => {
  return {
    type: FILTER_DRIVERS,
    payload: { team, source, order },
  };
};

export const orderDrivers = (order) => {
  return {
    type: ORDER_DRIVERS,
    payload: order,
  };
};