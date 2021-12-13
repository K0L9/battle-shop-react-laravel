import { 
    ProductAction, 
    IProduct, 
    IGetProductsResponse, 
    IDeleteProductsResponse,
    IAddProductsResponse,
    ProductActionTypes, 
    ProductErrors, 
    ISearchProduct,
    PaginatedListResponse,
    } from './types';

import {Dispatch} from "react";
import http from '../../http_common';
import axios, { AxiosError } from 'axios';
import { ServerResponse } from 'http';

export const getProducts = (search: ISearchProduct) => {
    return async (dispatch: Dispatch<ProductAction>) => {
        try {
            const response = await http.get<IGetProductsResponse>('api/products', {
                params: search
            });

            const {data} = response.data;
            SetProducts(data, dispatch);

            return Promise.resolve();
        }
        catch(error) {
            if(axios.isAxiosError(error)) {
                console.log("Action problem: ", error);
                const serverError = error as AxiosError<ProductErrors>;
                if(serverError && serverError.response){
                    return Promise.reject(serverError.response.data);
                }
            }
        }
    }
}
export const addProduct = (product: IProduct) => {
    return async(dispatch: Dispatch<ProductAction>) => {
        try {
            const response = await http.post<IAddProductsResponse>('api/products', product);
        }
        catch(error) {
            if(axios.isAxiosError(error)) {
                const serverError = error as AxiosError<ProductErrors>;
                if(serverError && serverError.response){
                    return Promise.reject(serverError.response.data);
                }
            }
        }
    }
}
export const removeProduct = (id: number) => {
    return async (dispatch: Dispatch<ProductAction>) => {
        try {
            const response = await http.delete<IAddProductsResponse>(`api/products/${id}`);
            const {data} = response.data;
            DeleteProduct(data, dispatch);
        } catch (error) {
            if(axios.isAxiosError(error)) {
                const serverError = error as AxiosError<ProductErrors>;
                if(serverError && serverError.response){
                    return Promise.reject(serverError.response.data);
                }
            }
        }
    }
}

export const SetProducts = (data: PaginatedListResponse, dispatch: Dispatch<ProductAction>) =>  {
    dispatch({
      type: ProductActionTypes.PRODUCTS_GET,
      payload: data,
    });
}
export const DeleteProduct = (data: IProduct, dispatch: Dispatch<ProductAction>) => {
    dispatch({
        type: ProductActionTypes.PRODUCT_DELETE,
        payload: data
    });
}