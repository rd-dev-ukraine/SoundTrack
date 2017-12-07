import * as React from "react";
import { Text, View, Button, KeyboardAvoidingView, StyleSheet } from "react-native";
import { connect, Dispatch } from "react-redux";
import { NavigationActions } from "react-navigation";

import { authLogin } from "../store";
import { validateForm, getFields, isValid, requiredValidator } from "../forms";

import { styles as formStyles } from "./styles/forms";
import { FormControl } from "./FormControl";

interface LoginScreenComponentProps {
    loading: boolean;
    serverError?: ApiError;
    onSubmitLogin: (creds: LoginCredentials) => any;
    goToSignUp: () => any;
}

interface LoginScreenComponentState extends FormState<LoginCredentials> {
}

const defaultState = (): LoginScreenComponentState => ({
    email: {
        value: "",
        label: "E-mail",
        type: "email",
        required: requiredValidator("E-mail is required"),
        error: undefined
    },
    password: {
        value: "",
        type: "password",
        label: "Password",
        required: requiredValidator("Password is required"),
        error: undefined
    }
});

class LoginScreenComponent extends React.Component<LoginScreenComponentProps, LoginScreenComponentState> {
    constructor(props: any) {
        super(props);
        this.state = defaultState();
    }

    render() {
        const { loading, serverError, goToSignUp } = this.props;
        return (
            <KeyboardAvoidingView
                style={formStyles.container}
                behavior="padding"
            >
                <View style={formStyles.form}>
                    <Text style={formStyles.error}>{serverError && serverError.message}</Text>
                    {
                        Object.keys(this.state).map((field: keyof LoginScreenComponentState, index) => (
                            <FormControl
                                key={index}
                                control={this.state[field]}
                                onChange={text => this.handleControlChange(text, field)}
                            />
                        ))
                    }
                    <Button
                        title="Login"
                        disabled={loading}
                        onPress={() => this.handleSubmit()}
                    />
                    <Text style={styles.orText}>or</Text>
                    <Button
                        title="Register"
                        disabled={loading}
                        onPress={goToSignUp}
                    />
                </View>
            </KeyboardAvoidingView>
        )
    }

    handleControlChange(value: string, controlName: keyof LoginScreenComponentState) {
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
            this.props.onSubmitLogin(getFields(this.state));
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
        onSubmitLogin(creds: LoginCredentials) { dispatch(authLogin(creds)) },
        goToSignUp() { dispatch(NavigationActions.navigate({ routeName: "SignUp" })) }
    };
}

export const LoginScreen = connect(mapStateToProps, mapDispatchToPros)(LoginScreenComponent);

const styles = StyleSheet.create({
    orText: {
        fontSize: 16,
        fontWeight: "500",
        alignSelf: "center"
    }
});