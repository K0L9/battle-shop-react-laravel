import { AuthAction, AuthActionTypes, ILoginModel, LoginError } from './types';

import {Dispatch} from "react";
import http from '../../../http_common';
import axios, { AxiosError } from 'axios';
import { ServerResponse } from 'http';

export const loginUser = (data: ILoginModel) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            const response = await http.post('api/auth/login', data);
            dispatch({type: AuthActionTypes.LOGIN_AUTH, payload: response.data});
            return Promise.resolve();
        }
        catch(error) {
            if(axios.isAxiosError(error)) {
                console.log("Action problem: ", error);
                const serverError = error as AxiosError<LoginError>;
                if(serverError && serverError.response){
                    return Promise.reject(serverError.response.data);
                }
            }
        }
    }
}
