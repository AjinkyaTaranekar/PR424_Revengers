import React from 'react';
import { DrawerActions } from 'react-navigation-drawer';
import { Icon, Button } from '@ui-kitten/components';


const hamBurger = (props) => (
  <Icon {...props} fill='#8F9BB3' name='menu-outline'/>
);

const DrawerButton = (props) => (
  <Button 
    style = {{position: 'absolute',left: 10, top: 35,}} 
    onPress= {() => (props.navigation.dispatch(DrawerActions.toggleDrawer()))}
    appearance = "ghost" 
    accessoryLeft = {hamBurger}
    size='large'/>
        
);

export default DrawerButton;