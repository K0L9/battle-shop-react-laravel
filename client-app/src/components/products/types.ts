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
export interface PaginatedListResponse{
    data: Array<IProduct>,
    last_page: number,
}
export interface IGetProductsResponse{
    data: PaginatedListResponse,
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

export interface ISearchProduct{
    page: number | string
}

export type ProductErrors = {
    id: string,
    name: string,
    detail: string,
    error: string
}

export interface ProductState {
    products: Array<IProduct>,
    pageCount: number,
}

export interface ProductGetAction {
    type: ProductActionTypes.PRODUCTS_GET,
    payload: PaginatedListResponse,
}
export interface ProductDeleteAction {
    type: ProductActionTypes.PRODUCT_DELETE,
    payload: IProduct,
}

export type ProductAction = ProductGetAction | ProductDeleteAction;