import {createStackNavigator} from 'react-navigation-stack';
import {createSwitchNavigator} from 'react-navigation';
import FarmerHomeScreen from '../screens/FarmerHomeScreen';
import TransporterHomeScreen from '../screens/TransporterHomeScreen';
import DrawerNavigation from './drawer'
import NavigateToFarmerScreen from '../screens/NavigateToFarmerScreen';

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
    Navigate: NavigateToFarmerScreen,
  },{
    defaultNavigationOptions: {
      header: null
    }
  })
})

export default mainFlow;