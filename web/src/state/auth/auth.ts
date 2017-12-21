import { takeLatest, takeEvery, put, call, select } from "redux-saga/effects";
import { push } from 'react-router-redux';

import { login, signUp, updateProfile } from "../../../../common/api/requests";
import { asyncStorageKey } from "../../../../common/constants";

import {
    AUTH_LOGIN,
    AuthLogin,
    AUTH_LOG_OUT,
    authLoggedIn,
    authLoginError,
    AUTH_SIGN_UP,
    AuthSignUp,
    AUTH_LOGGED_IN,
    AuthUpdateProfile,
    authUpdateProfileError,
    AUTH_UPDATE_PROFILE,
    AuthChangePassword,
    authChangePasswordError,
    AUTH_CHANGE_PASSWORD
} from "../../../../common/actions/auth";

function* loginSaga(action: AuthLogin) {
    const resp: ApiResponse<User> = yield call(
        login,
        action.credentials
    );
    if (resp.ok) {
        yield successLoginSaga(resp.response);
    } else if (resp.ok === false) {
        yield put(authLoginError(resp.error));
    }
}

function* signUpSaga(action: AuthSignUp) {
    const resp: ApiResponse<User> = yield call(
        signUp,
        action.form
    );
    if (resp.ok) {
        yield successLoginSaga(resp.response);
    } else if (resp.ok === false) {
        yield put(authLoginError(resp.error));
    }
}

function* updateProfileRequestSaga(form: UserBase | PasswordForm) {
    const profile = yield select(({ auth: { profile } }: AppState) => profile);
    return yield call(
        updateProfile,
        { ...form, id: profile.id },
        profile.token
    );
}

function* updateProfileSaga(action: AuthUpdateProfile) {
    const resp: ApiResponse<User, UserBase> = yield updateProfileRequestSaga(action.form);
    if (resp.ok) {
        yield successLoginSaga(resp.response);
    } else if (resp.ok === false) {
        yield put(authUpdateProfileError(resp.error));
    }
}

function* changePasswordSaga(action: AuthChangePassword) {
    const resp: ApiResponse<User, PasswordForm> = yield updateProfileRequestSaga(action.form);
    if (resp.ok) {
        yield successLoginSaga(resp.response);
    } else if (resp.ok === false) {
        yield put(authChangePasswordError(resp.error));
    }
}

function* loggedOutSaga() {
    yield put(NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName: "Login" })
        ]
    }));

    yield call(
        AsyncStorage.removeItem,
        `${asyncStorageKey}:profile`
    );
}

function* successLoginSaga(profile: User): any {
    yield put(authLoggedIn(profile));
    yield call(
        AsyncStorage.setItem,
        `${asyncStorageKey}:profile`,
        JSON.stringify(profile)
    );
}


export function* authSaga() {
    yield takeLatest(AUTH_LOGIN, loginSaga);
    yield takeLatest(AUTH_SIGN_UP, signUpSaga);
    yield takeEvery(AUTH_LOG_OUT, loggedOutSaga);
    yield takeLatest(AUTH_CHANGE_PASSWORD, changePasswordSaga);
    yield takeLatest(AUTH_UPDATE_PROFILE, updateProfileSaga);

    yield takeEvery(AUTH_LOGGED_IN, function* () {
        yield put(NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: "Main" })
            ]
        }));
    })
}