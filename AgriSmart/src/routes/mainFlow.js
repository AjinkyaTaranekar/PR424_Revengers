import {createStackNavigator} from 'react-navigation-stack';
import {createSwitchNavigator} from 'react-navigation';
import FarmerHomeScreen from '../screens/FarmerHomeScreen';
import TransporterHomeScreen from '../screens/TransporterHomeScreen';
import DrawerNavigation from './drawer'
import NavigateToFarmerScreen from '../screens/NavigateToFarmerScreen';
import PoolingFarmerNavigationScreen from '../screens/PoolingFarmerNavigation';
import talkToBot from '../screens/talkToBot'

const mainFlow = createSwitchNavigator({
 
  farmerFlow: createStackNavigator({
    FarmerHome: FarmerHomeScreen,
    ChatBot:talkToBot
  },{
    defaultNavigationOptions: {
      header: null
    }
  }),
  transporterFlow: createStackNavigator({
    TransporterHome: TransporterHomeScreen,
    Navigate: NavigateToFarmerScreen,
    Pooling: PoolingFarmerNavigationScreen

  },{
    defaultNavigationOptions: {
      header: null
    }
  })
})

export default mainFlow;