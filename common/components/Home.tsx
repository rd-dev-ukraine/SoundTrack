import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

import { styles as screnStyles } from "./styles/screen";


export const Home = () => {
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