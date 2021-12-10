import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useEffect, useState } from "react";
import { IProduct, ProductErrors } from "./types";
import {Link} from "react-router-dom"
import { getAllJSDocTagsOfKind } from "typescript";
import { triggerAsyncId } from "async_hooks";
import {toast} from "react-toastify"


const Products = () => {
    const {getProducts, removeProduct} = useActions();
    const {products} = useTypedSelector(redux => redux.product);
    const [isSubmited, setIsSubmitted] = useState<boolean>(true);
    var Loader = require("react-loader");

    useEffect(() => {
        getProducts();
        setIsSubmitted(false);
    }, [])

    const handleRemove = (id: number) => {
      setIsSubmitted(true);
      try {
        removeProduct(id);
        setIsSubmitted(false);
        toast.success(`Product with id ${id} successfully deleted`)
      } catch (error) {
        const serverErrors = error as ProductErrors;
          if(serverErrors.error){
                toast.error(serverErrors.error);
          }
          setIsSubmitted(false);
      }
    }

    return (
        <>
        <Loader loaded={!isSubmited}>
          <h1 className="text-center">Products</h1>
          <div className="row">
            <Link to="add" className="btn btn-success">Add</Link>
              <div className="col-md-6 offset-md-3">
              {products.length === 0 ? (
                  <h1>List is empty</h1>
              ): (
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                        {products.map((product: IProduct, id: number) => (
                          <tr className="table-active" key={id}>
                            <th scope="row">{product.id}</th>
                            <td>{product.name}</td>
                            <td>{product.detail}</td>
                            <td><button className="btn btn-danger" onClick={() => handleRemove(product.id)}>Remove</button></td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
              )}
              </div>
          </div>
            </Loader>
        </>
    )
}

export default Products;


