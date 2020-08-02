import {createStackNavigator} from 'react-navigation-stack';
import {createSwitchNavigator} from 'react-navigation';
import FarmerHomeScreen from '../screens/FarmerHomeScreen';
import TransporterHomeScreen from '../screens/TransporterHomeScreen';
import DrawerNavigation from './drawer'

const mainFlow = createSwitchNavigator({
 
  farmerFlow: createStackNavigator({
    FarmerHome: FarmerHomeScreen,
  },{
    defaultNavigationOptions: {
      header: null
    }
  }),
  transporterFlow: createStackNavigator({
    TransporterHome: TransporterHomeScreen,
  },{
    defaultNavigationOptions: {
      header: null
    }
  })
})

export default mainFlow;