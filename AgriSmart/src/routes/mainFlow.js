import {createStackNavigator} from 'react-navigation-stack';
import {createSwitchNavigator} from 'react-navigation';
import FarmerHomeScreen from '../screens/FarmerHomeScreen';
import TransporterHomeScreen from '../screens/TransporterHomeScreen';
import DrawerNavigation from './drawer';
import FindTransporterScreen from '../screens/FindTransporters';
import PaymentScreen from '../screens/PaymentScreen';
import NavigateToFarmerScreen from '../screens/NavigateToFarmerScreen';
import PoolingFarmerNavigationScreen from '../screens/PoolingFarmerNavigation';

const mainFlow = createSwitchNavigator({

  farmerFlow: createStackNavigator({
    FarmerHome: FarmerHomeScreen,
<<<<<<< HEAD
    ChatBot:talkToBot,
    FindTransporter: FindTransporterScreen,
    Payment: PaymentScreen
=======
>>>>>>> parent of 81cdeaf... Dialog flow implemented partially
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
