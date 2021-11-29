import { AuthAction, AuthActionTypes, ILoginModel } from '../../types/auth';
import { RegisterAction, RegisterActionTypes, IRegisterModel } from "../../types/register"

import {Dispatch} from "react";
import http from '../../http_common';
import { getMaxListeners } from 'process';

export const loginUser = (data: ILoginModel) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({type: AuthActionTypes.LOGIN_AUTH});
            const responce = await http.post('api/auth/login', data);
            dispatch({type: AuthActionTypes.LOGIN_AUTH_SUCCESS, payload: responce.data});
        }
        catch(error) {
            dispatch({type: AuthActionTypes.LOGIN_AUTH_ERROR, payload: "Error"});
        }
    }
}
export const registerUser = (data: IRegisterModel) => {
    return async (dispatch: Dispatch<RegisterAction>) => {
        try{
            dispatch({type: RegisterActionTypes.REGISTER_AUTH});
            const responce = await http.post('api/auth/register', data);
            dispatch({type: RegisterActionTypes.REGISTER_AUTH_SUCCESS});
        }
        catch(error){
            dispatch({type: RegisterActionTypes.REGISTER_AUTH_ERROR, payload: "Error"});
        }
    }
}