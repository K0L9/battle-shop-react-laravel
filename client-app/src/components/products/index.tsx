import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useEffect, useState } from "react";
import { IProduct, ProductErrors, ISearchProduct } from "./types";
import {Link, useNavigate} from "react-router-dom"
import { getAllJSDocTagsOfKind } from "typescript";
import { triggerAsyncId } from "async_hooks";
import {toast} from "react-toastify";
import ReactPaginate from 'react-paginate';


const Products = () => {
    const {getProducts, removeProduct} = useActions();
    const {products, pageCount} = useTypedSelector(redux => redux.product);
    const [isSubmited, setIsSubmitted] = useState<boolean>(false);
    var Loader = require("react-loader");
    const navigator = useNavigate();

    useEffect(() => {
      async function fetchProducts() {
        setIsSubmitted(true);
        try {
          const url = window.location.search;
          const params = new URLSearchParams(url);
          let page = params?.get('page') ?? 1; 

          console.log("page: ", page)

          const search: ISearchProduct = {
            page,
          };
          await getProducts(search);
          setIsSubmitted(false);
        } catch (error) {
          setIsSubmitted(false);
        }
      }
      fetchProducts();
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
    const handlePageClick = ( e: any ) => {
      // console.log("e: ", e)
      navigator(`/products?page=${e.selected + 1}`);
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
                <>
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
                  <ReactPaginate 
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  nextLabel=">"
                  previousLabel="<" 
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakLabel="..."
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  activeClassName="active"/>
                  </>
              )}
              </div>
          </div>
            </Loader>
        </>
    )
}

export default Products;


