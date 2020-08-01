
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import installationFlow from './installationFlow';
import loginFlow from './loginFlow';
import mainFlow from './mainFlow';
import ResolveLanguageScreen from '../screens/ResolveLanguageScreen';
import ResolveAuthScreen from '../screens/ResolveAuthScreen';

const switchNavigator = createSwitchNavigator({
    ResolveLanguage: ResolveLanguageScreen,
    ResolveAuth: ResolveAuthScreen,
    
    installationFlow: installationFlow,
    loginFlow: loginFlow,
  
    mainFlow: mainFlow,
  });

  const Application = createAppContainer(switchNavigator);
  export default Application;