import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        padding: 20,
    },
    form: {
        flex: 1,
        maxWidth: 400
    },
    error: {
        marginBottom: 10,
        fontSize: 16,
        color: "red"
    },
    control: {
        flexDirection: "column",
        alignItems: "flex-start",
        paddingBottom: 10,
        alignSelf: "stretch"
    },
    controlLabel: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 10
    },
    controlInputWrapper: {
        flexDirection: "column",
        marginBottom: 10,
        alignSelf: "stretch"
    },
    controlInut: {
        borderColor: 'gray',
        borderBottomWidth: 1,
        fontSize: 16,
        paddingBottom: 5
    },
    controlError: {
        fontSize: 12,
        color: "red",
        marginTop: 5
    }
})