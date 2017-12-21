import { apiUrl } from "../constants";

async function convertResult(resp: Response): Promise<ApiResponse<User>> {
    if (resp.ok) {
        return {
            ok: true,
            response: await resp.json()
        }
    } else {
        return {
            ok: false,
            error: await resp.json()
        }
    }
}

const headers = (token?: string) => new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Auth-Token': token
});

export const login = async (creds: LoginCredentials): Promise<ApiResponse<User>> => {
    const resp = await fetch(`${apiUrl}/users/login`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(creds)
    });
    return convertResult(resp);
}

export const signUp = async (form: UserForm): Promise<ApiResponse<User>> => {
    const resp = await fetch(`${apiUrl}/users`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(form)
    });
    return convertResult(resp);
}

export const updateProfile = async (form: UserBase | PasswordForm, token: string): Promise<ApiResponse<UserBase | PasswordForm>> => {
    const resp = await fetch(`${apiUrl}/users/profile`, {
        method: "PUT",
        headers: headers(token),
        body: JSON.stringify(form)
    });
    return convertResult(resp);
}