import * as React from "react";
import { Text, View, Button, KeyboardAvoidingView, ScrollView } from "react-native";
import { connect, Dispatch } from "react-redux";

import { authUpdateProfile } from "../store";
import { validateForm, isValid, requiredValidator, setFields, getFields } from "../forms";

import { styles } from "./styles/forms";
import { FormControl } from "./FormControl";


interface ProfileEditComponentProps {
    loading: boolean;
    serverError?: ApiError<User>;
    profile: User;

    onSubmitUpdate: (form: UserBase) => any;
}

interface ProfileEditComponentState extends FormState<UserBase> {
}

const defaultState = (): ProfileEditComponentState => ({
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
    }
});

class ProfileEditComponent extends React.Component<ProfileEditComponentProps, ProfileEditComponentState> {
    constructor(props: any) {
        super(props);
        this.state = defaultState();
    }

    componentWillMount() {
        this.setState(setFields(this.state, this.props.profile));
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
                                Object.keys(this.state).map((field: keyof ProfileEditComponentState, index) => (
                                    <FormControl
                                        key={index}
                                        control={this.state[field]}
                                        serverError={fieldErrors && fieldErrors[field]}
                                        onChange={text => this.handleControlChange(text, field)}
                                    />
                                ))
                            }
                            <Button
                                title="Save Changes"
                                disabled={loading}
                                onPress={() => this.handleSubmit()}
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }

    handleControlChange(value: string, controlName: keyof ProfileEditComponentState) {
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
            this.props.onSubmitUpdate(getFields(this.state));
        }
        this.setState(validatedForm);
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        loading: state.auth.loading,
        serverError: state.auth.error,
        profile: state.auth.profile
    };
}

const mapDispatchToPros = (dispatch: Dispatch<AppState>) => {
    return {
        onSubmitUpdate(form: UserBase) { dispatch(authUpdateProfile(form)) }
    };
}

export const ProfileEditScreen = connect(mapStateToProps, mapDispatchToPros)(ProfileEditComponent);