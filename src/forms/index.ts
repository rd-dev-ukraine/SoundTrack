

export function requiredValidator(errorMessage: string): ValidatorFn {
    return (value?: string | number) => {
        if (value === null
            || value === undefined
            || (typeof value === "string" && !value.trim())
        ) {
            return errorMessage;
        }
        return null;
    }
}

function formatValue(value: string, type: ControlType): string {
    switch (type) {
        case "email":
            return value.trim().toLowerCase();
        case "password":
            return value;
        default:
            return value.trim();
    }
}

function validateControl<T>(control: ControlState, formState: FormState<T>) {
    if (control.required) {
        const error = control.required(control.value);
        if (error) return error;
    }
    if (control.type === "password-confirmation") {
        const password = Object.keys(formState)
            .map<ControlState>(controlName => formState[controlName])
            .find(control => control.type === "password");
        if (!password) {
            throw ("There is no password for this password confirmation");
        }

        if (password.value !== control.value)
            return "Password Confirmation doesn't match";
    }
    return null;
}

export function validateForm<T>(state: FormState<T>): FormState<T> {
    const newState: FormState<T> = {} as any;
    Object.keys(state).forEach(formControl => {
        newState[formControl] = {
            ...state[formControl],
            value: formatValue(state[formControl].value, state[formControl].type),
            error: validateControl(state[formControl], state)
        } as ControlState;
    });
    return newState;
}

export function isValid<T>(state: FormState<T>): boolean {
    return Object.keys(state).every(field => !state[field].error);
}

export function getFields<T>(state: FormState<T>): T {
    const fields: T = {} as any;
    Object.keys(state).forEach(formControl => {
        fields[formControl] = formatValue(state[formControl].value, state[formControl].type);
    });
    return fields;
}

export function setFields<T>(state: FormState<T>, fields: T): FormState<T> {
    const newState: FormState<T> = {} as any;
    Object.keys(state).forEach(formControl => {
        newState[formControl] = {
            ...state[formControl],
            value: formatValue(fields[formControl] || state[formControl].value, state[formControl].type)
        } as ControlState;
    });
    return newState;
}