import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';

const mainFlow= createStackNavigator({
    Home: HomeScreen,
  },{
    defaultNavigationOptions: {
      header: null
    }
  })

  export default mainFlow;