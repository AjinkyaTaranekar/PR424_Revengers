import createDataContext from './createDataContext';
import {AsyncStorage} from 'react-native';
import trackerApi from '../api/tracker';
import {navigate} from '../navigationRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'signout':
      return {token: null, errorMessage: ''};
    case 'clear_error_message':
      return {...state, errorMessage: ''};
    case 'signin':
      return {errorMessage: '', token: action.payload};
    case 'add_err':
      return {...state, errorMessage: action.payload};
    case 'signup':
      return {errorMessage: '', token: action.payload};
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  console.log('INSIDE tryLocalSignin');
  const token = await AsyncStorage.getItem('token');

  if (token) {
    console.log('got token');
    dispatch({type: 'signin', payload: token});
    navigate('Home');
  } else {
    console.log('no token');
    navigate('Signup');
  }
};
const checkLanguageSelection = (dispatch) => async () => {
  console.log('INSIDE checkLanguageSelection');
  const language = await AsyncStorage.getItem('language');
  if (language) {
    console.log('got language', language);
    dispatch({type: 'language', payload: language});
    navigate('ResolveAuth');
  } else {
    console.log('no language');
    navigate('installationFlow');
  }
};
const clearErrorMessage = (dispatch) => () => {
  dispatch({type: 'clear_error_message'});
};
const signup = (dispatch) => {
  return async ({email, password}) => {
    try {
      const response = await trackerApi.post('/signup', {email, password});
      await AsyncStorage.setItem('token', response.data.token);
      dispatch({type: 'signup', payload: response.data.token});

      navigate('NameInput');
    } catch (err) {
      dispatch({type: 'add_err', payload: 'Something went wrong'});
    }
  };
};

const signin = (dispatch) => {
  return async ({email, password}) => {
    try {
      const response = await trackerApi.post('/signin', {email, password});
      await AsyncStorage.setItem('token', response.data.token);

      dispatch({type: 'signin', payload: response.data.token});
      navigate('NameInput');
    } catch (err) {
      dispatch({
        type: 'add_err',
        payload: 'SOmething went wrong with sign in',
      });
    }
  };
};

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem('token ');
  dispatch({type: 'signout'});
  navigate('loginFlow');
};

export const {Provider, Context} = createDataContext(
  authReducer,
  {tryLocalSignin, checkLanguageSelection, clearErrorMessage, signin, signout, signup},
  {token: null, errorMessage: ''},
);
