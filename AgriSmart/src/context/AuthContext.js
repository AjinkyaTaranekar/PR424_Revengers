
//updatelocations
import createDataContext from './createDataContext';
import {AsyncStorage, Alert} from 'react-native';
import trackerApi from '../api/tracker';
import {navigate} from '../navigationRef';




//MASTER SCHEMA
 farmerRequestJSON={name:"defaultname",reqActive:true, contactDetails: {
  phoneno: 1234,
  email: "String",
  address: "String",
},};

const sendVerificationMessage = (dispatch) => {
    return async ({phoneno, otp}) => {
      try {
        console.log(otp,phoneno);
        if (phoneno) {
          console.log(`https://api.textlocal.in/send/?apikey=OghcDXlOpPU-6D7I5qfvmzkhuP7Z98POefuKz0Q3mz&numbers=91${phoneno}&message=Your+AgriSmart+verification+code+is+${otp}&sender=TXTLCL`);
          var xhr = new XMLHttpRequest();
          xhr.open('GET', `https://api.textlocal.in/send/?apikey=OghcDXlOpPU-6D7I5qfvmzkhuP7Z98POefuKz0Q3mz&numbers=91${phoneno}&message=Your+AgriSmart+verification+code+is+${otp}&sender=TXTLCL`, true); 
          xhr.send();
          var response = xhr.responseText;
          console.log(response);
        }
      } catch (err) {
        dispatch({
          type: 'add_err',
          payload: 'Something went wrong with otp',
        });
      }
    }
};

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
      case 'updateshippingDetails':
      return {farmerRequestJSON:{...farmerRequestJSON,shippingDetails:{grainType:"Fruit",dateOfDelivery:action.payload.date,weight:action.payload.weight,mode:""}}};
      case 'bookShipping':
      return {farmerRequestJSON:{...farmerRequestJSON,shippingDetails:{...farmerRequestJSON.shippingDetails,mode:action.payload.mode}}};
      case 'add_err':
      return {...state, errorMessage: action.payload};
      case 'add_err':
      return {...state, errorMessage: action.payload};

      case 'updatename':
        return {farmerRequestJSON:{...farmerRequestJSON,name:action.payload}};
    case 'signup':
      return {errorMessage: '', token: action.payload};
      case 'getState':
      farmerRequestJSON=state.farmerRequestJSON;
      return {...state};
      case 'updatePhoneNo':
        return {...state,errorMessage: '', token: action.payload,farmerRequestJSON:{...farmerRequestJSON,
          contactDetails:{phoneno:action.payload

          }
        }};
        case 'updatelocations':
          return {...state,errorMessage: '', token: action.payload,farmerRequestJSON:{...farmerRequestJSON,
            locations:{
              origin:action.payload.origin,
              destination:action.payload.dest
            }
          }};
      case 'updateUserProfile':
        return {farmerRequestJSON:{...farmerRequestJSON,contactDetails:{phoneno:action.payload.phoneno,email:action.payload.email,address:action.payload.address}}};
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  console.log('INSIDE tryLocalSignin');
  const token = await AsyncStorage.getItem('token');
  console.log("token",token)
  if (token) {
    console.log('got token');
    dispatch({type: 'signin', payload: token});
    navigate('Drawer');
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
const checkVerificationDetails = (dispatch) => async () => {
  console.log('INSIDE checkVerificationDetails');
  const verify = await AsyncStorage.getItem('verify');
  if (verify == "true") {
    console.log('got verification', verify);
    dispatch({type: 'verification', payload: verify});
    navigate('transporterFlow');
  } else {
    console.log('no verification');
    navigate('DriverVerification');
  }
};
const clearErrorMessage = (dispatch) => () => {
  dispatch({type: 'clear_error_message'});
};
const signup = (dispatch) => {


  return async ({phoneno, password}) => {
    await AsyncStorage.setItem('permanentOTP', (Math.floor(Math.random()*(9999-999) +999).toString()));
  
    dispatch({type: 'updatePhoneNo', payload: phoneno});

    dispatch({type: 'getState', payload: ""});

    // now i have farmerRequestJSON
    console.log("farmerRequestJSON",farmerRequestJSON);

    try {
      const response = await trackerApi.post('/signup', {phoneno, password});
      await AsyncStorage.setItem('token', response.data.token);
      console.log(response);
      dispatch({type: 'signup', payload: response.data.token});
      navigate('NameInput');
    } catch (err) {
      console.log(err)
      dispatch({type: 'add_err', payload: 'Something went wrong'});
    }
  };
};
const updateCoords = (dispatch) => {


  return async ({origin, dest}) => {

    dispatch({type: 'updatelocations', payload: {origin,dest}});

    dispatch({type: 'getState', payload: ""});

    // now i have farmerRequestJSON
    console.log("farmerRequestJSON",farmerRequestJSON);

  
  };
};

//bookShipping
const bookShipping = (dispatch) => {


  return async (mode) => {

    dispatch({type: 'bookShipping', payload:mode});

    dispatch({type: 'getState', payload:""});

    // now i have farmerRequestJSON
    console.log("farmerRequestJSON",farmerRequestJSON);

    // call api to post data in master scHEMA
    // /requestData

    try {
console.log("starting post")
      
      const response = await trackerApi.post('/requestData', {farmerRequestJSON});
     
      //response.data is unique id of request
console.log("Post Succesful",response.data);
    
    }catch (err) {
      console.log('post failed',err);
     
    }


    try {
      const response = await trackerApi.post('/signup', {phoneno, password});
      await AsyncStorage.setItem('token', response.data.token);
      dispatch({type: 'signup', payload: response.data.token});

      navigate('NameInput');
    } catch (err) {
      dispatch({type: 'add_err', payload: 'Something went wrong'});
    }

  
  };
};


// updateshippingDetails
const updateshippingDetails = (dispatch) => {

  console.log("updateshippingDetails");

  return async (date1,weight,index) => {
const date="thisid date"
    await dispatch({type: 'updateshippingDetails', payload: {date,weight,index}});

    await dispatch({type: 'getState', payload: ""});

    // now i have farmerRequestJSON
    console.log("farmerRequestJSON",farmerRequestJSON);

    
  };
};
const updatename = (dispatch) => {


  return async (name) => {

    dispatch({type: 'updatename', payload: name});

    dispatch({type: 'getState', payload: ""});

    // now i have farmerRequestJSON
    console.log("farmerRequestJSON",farmerRequestJSON);

    navigate('UploadProfilePic');
  };
};
const updateUserProfile = (dispatch) => {
  return async (data) => {


    dispatch({type: 'updateUserProfile', payload: data});

    dispatch({type: 'getState', payload: ""});

    // now i have farmerRequestJSON
    console.log("farmerRequestJSON",farmerRequestJSON);



    const { phoneno, password, email, aadharno, name,address }=data
   
    try {
      console.log("Thisis Phone no",data);
      const response = await trackerApi.post('/updateUserProfile', { phoneno, password, email, aadharno, name });
      await AsyncStorage.setItem('token', response.data.token);
      dispatch({type: 'updateUserProfile', payload: response.data.token});

      navigate('👨‍🌾   Farmer Home');
    } catch (err) {

      console.log("There is a err",err)
     
      dispatch({type: 'add_err', payload: 'Something went wrong'});
    }
  };
};
const signin = (dispatch) => {
  return async ({phoneno, password}) => {
    try {
      const response = await trackerApi.post('/signin', {phoneno, password});
      await AsyncStorage.setItem('token', response.data.token);

      dispatch({type: 'signin', payload: response.data.token});
      navigate('NameInput');
    } catch (err) {
      dispatch({
        type: 'add_err',
        payload: 'Something went wrong with sign in',
      });
    }
  };
};

const signout = (dispatch) => async () => {
  console.log("logout");

  await AsyncStorage.removeItem('token');
  dispatch({type: 'signout'});
  navigate('loginFlow');
};

export const {Provider, Context} = createDataContext(
  authReducer,
  {sendVerificationMessage, tryLocalSignin, checkVerificationDetails,updateUserProfile,bookShipping,updatename,updateshippingDetails,updateCoords,checkLanguageSelection, clearErrorMessage, signin, signout, signup},
  {token: null, errorMessage: '',farmerRequestJSON:null},
);
