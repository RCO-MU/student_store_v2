/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import * as React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';
import ProductView from '../ProductView/ProductView';
import NotFound from '../NotFound/NotFound';
import { API_URL } from '../../constants';

export default function ProductDetail({
  shoppingCart, handleAddItemToCart, handleRemoveItemFromCart,
  isFetching, setIsFetching, setError,
}) {
  // **********************************************************************
  // STATE VARIABLES AND FUNCTIONS
  // **********************************************************************

  const [product, setProduct] = useState({});

  // **********************************************************************
  // URL PARAMS
  // **********************************************************************

  const { productId } = useParams();

  // **********************************************************************
  // AXIOS GET
  // **********************************************************************

  async function fetchProduct(id) {
    setIsFetching(true);
    try {
      const { data } = await axios(`${API_URL}/${id}`);
      console.log('Product ', data);
      setProduct(data.product);
      setError('');
    } catch (err) {
      console.error(err);
      setError('invalid ID');
    }
    setIsFetching(false);
  }

  // **********************************************************************
  // FETCH DATA ON PAGE LOAD
  // **********************************************************************

  useEffect(() => {
    fetchProduct(productId);
  }, []);

  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************

  // loading
  if (isFetching) {
    return (<h1 className="loading">Loading...</h1>);
  }
  // if product search does not succeed (product is not populated)
  if (Object.keys(product).length === 0) {
    return (<NotFound />);
  }
  return (
    <div className="product-detail">
      <ProductView
        key={productId}
        product={product}
        productId={parseInt(productId, 10)}
        shoppingCart={shoppingCart}
        showDescription
        handleAddItemToCart={handleAddItemToCart}
        handleRemoveItemFromCart={handleRemoveItemFromCart}
      />
    </div>
  );
}
