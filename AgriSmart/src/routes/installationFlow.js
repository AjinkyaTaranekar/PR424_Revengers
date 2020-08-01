import {createStackNavigator} from 'react-navigation-stack';
import LanguageSelectionScreen from '../screens/LanguageSelectionScreen';
import WelcomeScreen from '../screens/WelcomeScreen';


const installationFlow=createStackNavigator({
    LanguageSelection: LanguageSelectionScreen,
    Welcome: WelcomeScreen,
  },{
      defaultNavigationOptions: {
        header: null
      }
    }
  )


  export default installationFlow