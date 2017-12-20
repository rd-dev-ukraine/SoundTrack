import * as React from "react";
import { Text, View, Button, ScrollView, KeyboardAvoidingView } from "react-native";
import { connect, Dispatch } from "react-redux";

import { authSignUp } from "../store";
import { validateForm, getFields, isValid, requiredValidator } from "../forms";

import { styles } from "./styles/forms";
import { FormControl } from "./FormControl";


interface SignUpScreenComponentProps {
    loading: boolean;
    serverError?: ApiError<User>;
    onSubmitLogin: (form: UserForm) => any;
}

interface SignUpScreenComponentState extends FormState<UserForm> {
}

const defaultState = (): SignUpScreenComponentState => ({
    firstName: {
        value: "",
        label: "First Name",
        type: "text",
        required: requiredValidator("First Name is required"),
        error: undefined
    },
    lastName: {
        value: "",
        label: "Last Name",
        type: "text",
        required: requiredValidator("Last Name is required"),
        error: undefined
    },
    email: {
        value: "",
        label: "E-mail address",
        type: "email",
        required: requiredValidator("E-mail is required"),
        error: undefined
    },
    userName: {
        value: "",
        label: "Screen Name",
        type: "text",
        required: requiredValidator("Screen Name is required"),
        error: undefined
    },
    city: {
        value: "",
        label: "City",
        type: "text",
        required: requiredValidator("City is required"),
        error: undefined
    },
    password: {
        value: "",
        label: "Password",
        type: "password",
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

class SignUpScreenComponent extends React.Component<SignUpScreenComponentProps, SignUpScreenComponentState> {
    constructor(props: any) {
        super(props);
        this.state = defaultState();
    }

    render() {
        const { loading, serverError } = this.props;
        const fieldErrors = serverError && serverError.fieldErrors;

        return (
            <KeyboardAvoidingView behavior="padding">
                <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
                    <View style={styles.container}>
                        <View style={styles.form}>
                            <Text style={styles.error}>{serverError && serverError.message}</Text>
                            {
                                Object.keys(this.state).map((field: keyof SignUpScreenComponentState, index) => (
                                    <FormControl
                                        key={index}
                                        control={this.state[field]}
                                        serverError={fieldErrors && fieldErrors[field]}
                                        onChange={text => this.handleControlChange(text, field)}
                                    />
                                ))
                            }
                            <Button
                                title="Sign up"
                                disabled={loading}
                                onPress={() => this.handleSubmit()}
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }

    handleControlChange(value: string, controlName: keyof SignUpScreenComponentState) {
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
        onSubmitLogin(form: UserForm) { dispatch(authSignUp(form)) }
    };
}

export const SignUpScreen = connect(mapStateToProps, mapDispatchToPros)(SignUpScreenComponent);