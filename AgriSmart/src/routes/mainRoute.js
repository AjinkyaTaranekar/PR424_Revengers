
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import installationFlow from './installationFlow';
import loginFlow from './loginFlow';
import mainFlow from './mainFlow';
import ResolveLanguageScreen from '../screens/ResolveLanguageScreen';
import ResolveAuthScreen from '../screens/ResolveAuthScreen';
import DrawerNavigation from './drawer'
const switchNavigator = createSwitchNavigator({
  
   
    ResolveLanguage: ResolveLanguageScreen,
    ResolveAuth: ResolveAuthScreen,
    Drawer :DrawerNavigation,
   
    installationFlow: installationFlow,
    loginFlow: loginFlow,

    mainFlow: mainFlow,
    
  });

  const Application = createAppContainer(switchNavigator);
  export default Application;