import * as React from "react";
import { Text, View, Button, ScrollView, KeyboardAvoidingView } from "react-native";

import { validateForm, getFields, isValid, requiredValidator } from "../../common/forms";

import { styles } from "./styles/forms";
import { FormControl } from "./FormControl";


interface SignUpComponentProps {
    loading: boolean;
    serverError?: ApiError<User>;
    onSubmitLogin: (form: UserForm) => any;
}

interface SignUpComponentState extends FormState<UserForm> {
}

const defaultState = (): SignUpComponentState => ({
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

export class SignUpComponent extends React.Component<SignUpComponentProps, SignUpComponentState> {
    constructor(props: any) {
        super(props);
        this.state = defaultState();
    }

    render() {
        const { loading, serverError } = this.props;
        const fieldErrors = serverError && serverError.fieldErrors;

        return (
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
                    <View style={styles.container}>
                        <View style={styles.form}>
                            <Text style={styles.error}>{serverError && serverError.message}</Text>
                            {
                                Object.keys(this.state).map((field: keyof SignUpComponentState, index) => (
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

    handleControlChange(value: string, controlName: keyof SignUpComponentState) {
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