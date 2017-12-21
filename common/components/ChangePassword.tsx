import * as React from "react";
import { Text, View, Button, KeyboardAvoidingView } from "react-native";

import { validateForm, getFields, isValid, requiredValidator } from "../forms";

import { styles as formStyles } from "./styles/forms";
import { FormControl } from "./FormControl";

interface ChangePasswordComponentProps {
    loading: boolean;
    serverError?: ApiError;
    onSubmitChangePassword: (form: PasswordForm) => any;
}

interface ChangePasswordComponentState extends FormState<PasswordForm> {
}

const defaultState = (): ChangePasswordComponentState => ({
    password: {
        value: "",
        type: "password",
        label: "New Password",
        required: requiredValidator("Password is required"),
        error: undefined
    },
    passwordConfirmation: {
        value: "",
        label: "Password Confirmation",
        type: "password-confirmation",
        required: requiredValidator("Password Confirmation is required"),
        error: undefined
    }
});

export class ChangePasswordComponent extends React.Component<ChangePasswordComponentProps, ChangePasswordComponentState> {
    constructor(props: any) {
        super(props);
        this.state = defaultState();
    }

    render() {
        const { loading, serverError } = this.props;
        return (
            <KeyboardAvoidingView
                style={formStyles.container}
                behavior="padding"
            >
                <View style={formStyles.form}>
                    <Text style={formStyles.error}>{serverError && serverError.message}</Text>
                    {
                        Object.keys(this.state).map((field: keyof ChangePasswordComponentState, index) => (
                            <FormControl
                                key={index}
                                control={this.state[field]}
                                onChange={text => this.handleControlChange(text, field)}
                            />
                        ))
                    }
                    <Button
                        title="Change Password"
                        disabled={loading}
                        onPress={() => this.handleSubmit()}
                    />
                </View>
            </KeyboardAvoidingView>
        )
    }

    handleControlChange(value: string, controlName: keyof ChangePasswordComponentState) {
        this.setState((prevState) => ({
            ...prevState,
            [controlName]: {
                ...prevState[controlName],
                value
            }
        }));
    }

    handleSubmit() {
        const validatedForm = validateForm(this.state);
        if (isValid(validatedForm)) {
            this.props.onSubmitChangePassword(getFields(this.state));
        }
        this.setState(validatedForm);
    }
}

