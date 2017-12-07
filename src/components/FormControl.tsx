
import * as React from "react";
import { Text, TextInput, View, KeyboardType } from "react-native";

import { styles } from "./styles/forms";

interface FormControlProps {
    control: ControlState;
    serverError?: string;
    onChange?: (val: any) => any;
}

const keyboardType = (type: string): KeyboardType => {
    switch (type) {
        case "email":
            return "email-address";
        default:
            return "default";
    }
}

export const FormControl = ({ control, serverError, onChange }: FormControlProps) => {
    return (
        < View style={styles.control} >
            {control.label && <Text style={styles.controlLabel}>{control.label}</Text>}
            <View style={styles.controlInputWrapper}>
                <TextInput
                    autoCapitalize="none"
                    style={styles.controlInut}
                    value={control.value}
                    keyboardType={keyboardType(control.type)}
                    underlineColorAndroid="transparent"
                    secureTextEntry={control.type === "password" || control.type === "password-confirmation"}
                    autoCorrect={control.autoCorrect}
                    onChangeText={onChange}
                />
                <Text style={styles.controlError}>{control.error || serverError}</Text>
            </View>
        </ View>
    )
}