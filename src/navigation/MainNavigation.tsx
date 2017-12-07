import * as React from "react";
import { TabNavigator, NavigationScreenProps } from 'react-navigation';

import { HomeScreen, ProfileScreen } from '../components';


const MainNavigator = TabNavigator(
    {
        Home: { screen: HomeScreen },
        Profile: { screen: ProfileScreen }
    },
    {
        initialRouteName: "Profile",
        swipeEnabled: true,
        animationEnabled: true
    }
)

const MainNavComponent = (props: NavigationScreenProps<{}>) => {
    return <MainNavigator navigation={props.navigation} />
};
MainNavComponent["router"] = MainNavigator.router;

export { MainNavComponent };
