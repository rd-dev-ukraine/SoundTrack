import * as React from "react";
import { TabNavigator, NavigationScreenProps } from 'react-navigation';

import { ProfileScreen } from '../containers';
import { Home } from "../../common/components";

const MainNavigator = TabNavigator(
    {
        Home: { screen: Home },
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
