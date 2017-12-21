import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ProfileViewProps {
    profile: User;
}

export const ProfileView = ({ profile }: ProfileViewProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.label}>First Name:</Text>
                <Text style={styles.value}>{profile.firstName}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Last Name:</Text>
                <Text style={styles.value}>{profile.lastName}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>E-mail:</Text>
                <Text style={styles.value}>{profile.email}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Screen Name:</Text>
                <Text style={styles.value}>{profile.userName}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>City:</Text>
                <Text style={styles.value}>{profile.city}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: "stretch"
    },
    row: {
        flexDirection: "row",
        marginHorizontal: 20,
        marginVertical: 5
    },
    label: {
        width: "33%",
        fontSize: 16,
        fontWeight: "600"
    },
    value: {
        width: "66%",        
        fontSize: 17,
        fontWeight: "500"
    }
});