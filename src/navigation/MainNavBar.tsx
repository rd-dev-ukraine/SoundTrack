import * as React from "react";
import { View, Button, StyleSheet } from "react-native";

export class MainNavBar extends React.Component<any, {}> {
    render() {
        return (
            <View style={styles.container}>
                {this.props.navigation.state.routes.map((route, index) => (
                    <View
                        style={styles.pill}
                        key={route.key}
                    >
                        <Button
                            title={route.routeName}
                            disabled={this.props.navigationState.index === index}
                            onPress={() => this.props.navigation.navigate(route.routeName, route.params)}
                        />
                    </View>
                ))}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        height: 30
    },
    pill: {
        flex: 1
    }
})