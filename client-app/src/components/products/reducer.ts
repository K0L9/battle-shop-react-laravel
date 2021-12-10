import { ProductAction, ProductActionTypes, ProductState } from './types';

const initialState: ProductState = {
    products: [],
}

export const productReducer = (state = initialState, action: ProductAction): ProductState => {
    switch (action.type) {
        case ProductActionTypes.PRODUCTS_GET: {
            return {
                ...state, products: action.payload
            };
        };
        case ProductActionTypes.PRODUCT_DELETE: {
            let tmpList = state.products.filter((v, i, a) => {
                return v.id != action.payload.id
            });
            return {
                ...state, products: tmpList
            };
        }
        default:
            return state;
    }
}