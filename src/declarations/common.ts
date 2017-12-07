interface LoginCredentials {
    email: string;
    password: string;
}

interface ControlState {
    value: any,
    error: string,
    label?: string,
    required?: ValidatorFn;
    autoCorrect?: boolean;
    type: ControlType;
}

type ControlType = "email" | "password" | "text" | "password-confirmation";

type FormState<Fields> = {
    [field in keyof Fields]: ControlState;
}

type ValidatorFn = (value: any) => string | null