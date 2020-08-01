import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ThemeContext } from './theme-context';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {Provider as AuthProvider} from './context/AuthContext';
import {setNavigator} from './navigationRef';

import ResolveAuthScreen from './screens/ResolveAuthScreen';
import HomeScreen from './screens/HomeScreen';
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';
import ResolveLanguageScreen from './screens/ResolveLanguageScreen';
import LanguageSelectionScreen from './screens/LanguageSelectionScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import UploadProfilePicScreen from './screens/UploadProfilePicScreen';
import ChooseModeScreen from './screens/ChooseModeScreen';
import NameInputScreen from './screens/NameInputScreen';
import DriverVerificationScreen from './screens/DriverVerificationScreen';

const switchNavigator = createSwitchNavigator({
  ResolveLanguage: ResolveLanguageScreen,
  ResolveAuth: ResolveAuthScreen,
  
  installationFlow: createStackNavigator({
    LanguageSelection: LanguageSelectionScreen,
    Welcome: WelcomeScreen,
  },{
      defaultNavigationOptions: {
        header: null
      }
    }
  ),
  loginFlow: createStackNavigator({
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
  ),

  mainFlow: createStackNavigator({
    Home: HomeScreen,
  },{
    defaultNavigationOptions: {
      header: null
    }
  }),
});

const Application = createAppContainer(switchNavigator);

export default () => {

  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  return (
    <>
      <IconRegistry icons={EvaIconsPack}/>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ApplicationProvider {...eva} theme={eva[theme]}>
          <AuthProvider>
            <Application
              ref={navigator => {
                setNavigator(navigator);
              }}
            />
          </AuthProvider>
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
  );
};
