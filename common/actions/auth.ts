export const AUTH_LOGIN = "AUTH_LOGIN";
export type AUTH_LOGIN = typeof AUTH_LOGIN;

export interface AuthLogin {
    type: AUTH_LOGIN;
    credentials: LoginCredentials;
}

export const authLogin = (credentials: LoginCredentials): AuthLogin => {
    return {
        type: AUTH_LOGIN,
        credentials
    };
}

export const AUTH_LOGGED_IN = "AUTH_LOGGED_IN";
export type AUTH_LOGGED_IN = typeof AUTH_LOGGED_IN;

export interface AuthLoggedIn {
    type: AUTH_LOGGED_IN;
    profile: User;
}

export const authLoggedIn = (profile: User): AuthLoggedIn => {
    return {
        type: AUTH_LOGGED_IN,
        profile
    };
}

export const AUTH_LOGIN_ERROR = "AUTH_LOGIN_ERROR";
export type AUTH_LOGIN_ERROR = typeof AUTH_LOGIN_ERROR;

export interface AuthLoginError {
    type: AUTH_LOGIN_ERROR;
    error: ApiError<{} | User>;
}

export const authLoginError = (error: ApiError): AuthLoginError => {
    return {
        type: AUTH_LOGIN_ERROR,
        error
    };
}

export const AUTH_LOG_OUT = "AUTH_LOG_OUT";
export type AUTH_LOG_OUT = typeof AUTH_LOG_OUT;

export interface AuthLogOut {
    type: AUTH_LOG_OUT;
}

export const authLogOut = (): AuthLogOut => {
    return {
        type: AUTH_LOG_OUT
    };
}

export const AUTH_SIGN_UP = "AUTH_SIGN_UP";
export type AUTH_SIGN_UP = typeof AUTH_SIGN_UP;

export interface AuthSignUp {
    type: AUTH_SIGN_UP;
    form: UserForm;
}

export const authSignUp = (form: UserForm): AuthSignUp => {
    return {
        type: AUTH_SIGN_UP,
        form
    };
}

export const AUTH_SIGN_UP_ERROR = "AUTH_SIGN_UP_ERROR";
export type AUTH_SIGN_UP_ERROR = typeof AUTH_SIGN_UP_ERROR;

export interface AuthSignUpError {
    type: AUTH_SIGN_UP_ERROR;
    error: ApiError<User>;
}

export const authSignUpError = (error: ApiError<User>): AuthSignUpError => {
    return {
        type: AUTH_SIGN_UP_ERROR,
        error
    };
}

export const AUTH_CHANGE_PASSWORD = "AUTH_CHANGE_PASSWORD";
export type AUTH_CHANGE_PASSWORD = typeof AUTH_CHANGE_PASSWORD;

export interface AuthChangePassword {
    type: AUTH_CHANGE_PASSWORD;
    form: PasswordForm;
}

export const authChangePassword = (form: PasswordForm): AuthChangePassword => {
    return {
        type: AUTH_CHANGE_PASSWORD,
        form
    };
}

export const AUTH_CHANGE_PASSWORD_ERROR = "AUTH_CHANGE_PASSWORD_ERROR";
export type AUTH_CHANGE_PASSWORD_ERROR = typeof AUTH_CHANGE_PASSWORD_ERROR;

export interface AuthChangePasswordError {
    type: AUTH_CHANGE_PASSWORD_ERROR;
    error: ApiError<PasswordForm>;
}

export const authChangePasswordError = (error: ApiError<PasswordForm>): AuthChangePasswordError => {
    return {
        type: AUTH_CHANGE_PASSWORD_ERROR,
        error
    };
}

export const AUTH_UPDATE_PROFILE = "AUTH_UPDATE_PROFILE";
export type AUTH_UPDATE_PROFILE = typeof AUTH_UPDATE_PROFILE;

export interface AuthUpdateProfile {
    type: AUTH_UPDATE_PROFILE;
    form: UserBase;
}

export const authUpdateProfile = (form: UserBase): AuthUpdateProfile => {
    return {
        type: AUTH_UPDATE_PROFILE,
        form
    };
}

export const AUTH_UPDATE_PROFILE_ERROR = "AUTH_UPDATE_PROFILE_ERROR";
export type AUTH_UPDATE_PROFILE_ERROR = typeof AUTH_UPDATE_PROFILE_ERROR;

export interface AuthUpdateProfileError {
    type: AUTH_UPDATE_PROFILE_ERROR;
    error: ApiError<UserBase>;
}

export const authUpdateProfileError = (error: ApiError<UserBase>): AuthUpdateProfileError => {
    return {
        type: AUTH_UPDATE_PROFILE_ERROR,
        error
    };
}

export type AuthAction =
    AuthLogin
    | AuthLoggedIn
    | AuthLogOut
    | AuthLoginError
    | AuthSignUp
    | AuthSignUpError
    | AuthChangePassword
    | AuthChangePasswordError
    | AuthUpdateProfile
    | AuthUpdateProfileError;

