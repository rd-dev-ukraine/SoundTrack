interface AuthState {
    profile?: User;
    error?: ApiError;
    loading: boolean;
}

interface AppState {
    auth: AuthState;
    nav: any;
}