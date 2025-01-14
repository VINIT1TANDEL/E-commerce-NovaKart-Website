import React, { useState, Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction.js';
import Loader from '../layout/Loader/Loader.js';
import ProductCard from '../Home/ProductCard.js';
import './Products.css';
import Pagination from 'react-js-pagination';
import { Slider } from '@material-ui/core';
import {Typography} from '@material-ui/core';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData.js';
const Product = () => {

  const categories = [
    "laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];
  
    const dispatch = useDispatch();
    const alert=useAlert();
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);
    const { keyword } = useParams();
    const { products, loading, error, productsCount, resultPerPage } = useSelector((state) => state.products);

    const setCurrentPageNo = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const priceHandler = (event, newPrice) => {
      setPrice(newPrice);
    };

    useEffect(() => {
        if (error) {
          alert.error(error)
            dispatch(clearErrors());
        }
        dispatch(getProduct(keyword, currentPage,price,category,ratings));
    }, [dispatch, keyword, error, currentPage,price,category,ratings,alert]);

    // Add console.log to check the values
    console.log("Current Page:", currentPage);
    console.log("Results Per Page:", resultPerPage);
    console.log("Product Count:", productsCount);

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title="PRODUCTS -- NovaKart"/>
                    <h2 className="productsHeading">Products</h2>
                    <div className="products">
                        {products && products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                    <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />
            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
            </div>

                    
                    {resultPerPage < productsCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
    );
};

export default Product;
