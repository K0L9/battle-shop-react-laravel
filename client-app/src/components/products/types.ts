export enum ProductActionTypes {
    PRODUCTS_GET = "GET_ALL_PRODUCTS",
    PRODUCT_ADD = "ADD_PRODUCT",
    PRODUCT_DELETE = "DELETE_PRODUCT",
}

export interface IProduct {
    id: number,
    name: string,
    detail: string,
}
export interface IGetProductsResponse{
    data: Array<IProduct>,
    success: boolean,
    message: string
    currentPage: number,
}
export interface IDeleteProductsResponse{
    data: IProduct,
    success: boolean,
    message: string
}
export interface IAddProductsResponse{
    data: IProduct,
    success: boolean,
    message: string
}
export interface IDeleteProductsResponse{
    data: IProduct,
    success: boolean,
    message: string
}

export type ProductErrors = {
    id: string,
    name: string,
    detail: string,
    error: string
}

export interface ProductState {
    products: Array<IProduct>,
}

export interface ProductGetAction {
    type: ProductActionTypes.PRODUCTS_GET,
    payload: Array<IProduct>,
}
export interface ProductDeleteAction {
    type: ProductActionTypes.PRODUCT_DELETE,
    payload: IProduct,
}

export type ProductAction = ProductGetAction | ProductDeleteAction;