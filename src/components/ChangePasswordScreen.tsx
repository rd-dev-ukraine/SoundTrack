import * as React from "react";
import { Text, View, Button, KeyboardAvoidingView } from "react-native";
import { connect, Dispatch } from "react-redux";

import { authChangePassword } from "../store";
import { validateForm, getFields, isValid, requiredValidator } from "../forms";

import { styles as formStyles } from "./styles/forms";
import { FormControl } from "./FormControl";

interface ChangePasswordScreenComponentProps {
    loading: boolean;
    serverError?: ApiError;
    onSubmitChangePassword: (form: PasswordForm) => any;
}

interface ChangePasswordScreenComponentState extends FormState<PasswordForm> {
}

const defaultState = (): ChangePasswordScreenComponentState => ({
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

class ChangePasswordScreenComponent extends React.Component<ChangePasswordScreenComponentProps, ChangePasswordScreenComponentState> {
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
                        Object.keys(this.state).map((field: keyof ChangePasswordScreenComponentState, index) => (
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

    handleControlChange(value: string, controlName: keyof ChangePasswordScreenComponentState) {
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

const mapStateToProps = (state: AppState) => {
    return {
        loading: state.auth.loading,
        serverError: state.auth.error
    };
}

const mapDispatchToPros = (dispatch: Dispatch<AppState>) => {
    return {
        onSubmitChangePassword(form: PasswordForm) { dispatch(authChangePassword(form)) },
    };
}

export const ChangePasswordScreen = connect(mapStateToProps, mapDispatchToPros)(ChangePasswordScreenComponent);