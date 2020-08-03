import {createStackNavigator} from 'react-navigation-stack';
import SigninScreen from '../screens/SigninScreen';
import SignupScreen from '../screens/SignupScreen';
import NameInputScreen from '../screens/NameInputScreen';
import UploadProfilePicScreen from '../screens/UploadProfilePicScreen';
import ChooseModeScreen from '../screens/ChooseModeScreen';
import DriverVerificationScreen from '../screens/DriverVerificationScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import VerifyOTPScreen from '../screens/VerifyOTPScreen';


const loginFlow=  createStackNavigator({
    Signup: SignupScreen,
    ForgotPwd:ResetPasswordScreen,
    VerifyOTP:VerifyOTPScreen,
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