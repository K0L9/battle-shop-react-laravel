export enum RegisterActionTypes {
    REGISTER_AUTH = "REGISTER_AUTH",
    REGISTER_AUTH_SUCCESS = "REGISTER_AUTH_SUCCESS",
    REGISTER_AUTH_ERROR = "REGISTER_AUTH_ERROR",
}

export interface IRegisterModel {
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
}

export interface RegisterAuthAction {
    type: RegisterActionTypes.REGISTER_AUTH
}
export interface RegisterAuthSuccesAction {
    type: RegisterActionTypes.REGISTER_AUTH_SUCCESS
}
export interface RegisterAuthErrorAction {
    type: RegisterActionTypes.REGISTER_AUTH_ERROR,
    payload: string
}

export type RegisterAction = RegisterAuthAction | RegisterAuthSuccesAction | RegisterAuthErrorAction;
