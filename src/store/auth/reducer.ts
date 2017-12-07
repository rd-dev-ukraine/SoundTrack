import { NavigationNavigateAction } from "react-navigation";

import {
    AuthAction,
    AUTH_LOGIN,
    AUTH_LOG_OUT,
    AUTH_LOGGED_IN,
    AUTH_LOGIN_ERROR,
    AUTH_SIGN_UP,
    AUTH_SIGN_UP_ERROR,
    AUTH_CHANGE_PASSWORD,
    AUTH_CHANGE_PASSWORD_ERROR,
    AUTH_UPDATE_PROFILE,
    AUTH_UPDATE_PROFILE_ERROR
} from "./actions";


export const defaultAuthState: AuthState = {
    error: undefined,
    profile: undefined,
    loading: false
};

export const authReducer = (state: AuthState = defaultAuthState, action: AuthAction | NavigationNavigateAction): AuthState => {
    switch (action.type) {
        case AUTH_LOGIN:
        case AUTH_SIGN_UP:
        case AUTH_CHANGE_PASSWORD:
        case AUTH_UPDATE_PROFILE:
            return {
                ...state,
                loading: true,
                error: undefined
            };
        case AUTH_LOGGED_IN:
            return {
                ...state,
                loading: false,
                profile: action.profile
            };
        case AUTH_LOGIN_ERROR:
        case AUTH_SIGN_UP_ERROR:
        case AUTH_CHANGE_PASSWORD_ERROR:
        case AUTH_UPDATE_PROFILE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case AUTH_LOG_OUT:
            return {
                ...state,
                profile: undefined
            }
        case 'Navigation/NAVIGATE':
            return {
                ...state,
                error: undefined
            }
        default:
            return state;
    }
}