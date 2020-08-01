import React from 'react';
import Application from './src/routes/mainRoute'
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ThemeContext } from './src/theme-context';
import {Provider as AuthProvider} from './src/context/AuthContext';
import {setNavigator} from './src/navigationRef';

const App= () => {

  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  // Application is comming from  mainRoute
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

export default App;