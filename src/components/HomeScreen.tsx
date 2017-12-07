import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationScreenProps } from 'react-navigation';

import { styles as screnStyles } from "./styles/screen";

interface HomeScreenParams {
    user: string;
}

export const HomeScreen = (_: NavigationScreenProps<HomeScreenParams>) => {
    return (
        <View style={StyleSheet.flatten([screnStyles.screenContainer, styles.container])}>
            <Text>Some other screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    }
})