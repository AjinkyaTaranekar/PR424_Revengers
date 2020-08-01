import {createStackNavigator} from 'react-navigation-stack';
import SigninScreen from '../screens/SigninScreen';
import SignupScreen from '../screens/SignupScreen';
import NameInputScreen from '../screens/NameInputScreen';
import UploadProfilePicScreen from '../screens/UploadProfilePicScreen';
import ChooseModeScreen from '../screens/ChooseModeScreen';
import DriverVerificationScreen from '../screens/DriverVerificationScreen';


const loginFlow=  createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen,
    NameInput: NameInputScreen,
    UploadProfilePic: UploadProfilePicScreen,
    ChooseMode: ChooseModeScreen,
    DriverVerification: DriverVerificationScreen
  },{
      defaultNavigationOptions: {
        header: null
      }
    }
  )
  
  export default loginFlow