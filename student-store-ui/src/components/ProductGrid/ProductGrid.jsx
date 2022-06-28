/* eslint-disable react/prop-types */
import * as React from 'react';
import './ProductGrid.css';
import ProductCard from '../ProductCard/ProductCard';

export default function ProductGrid({
  products, query, category, isFetching, handleAddItemToCart,
  handleRemoveItemFromCart, shoppingCart,
}) {
  // **********************************************************************
  // CONSTANTS
  // **********************************************************************

  const noItemsMessage = "Sorry, we couldn't find what you were looking for.";

  // **********************************************************************
  // ELEMENT RENDERING
  // **********************************************************************

  // loading
  if (isFetching) {
    return (
      <div className="loading-grid">
        <h1>Loading...</h1>
      </div>
    );
  }

  // activeProducts = products that match filter conditions
  const activeProducts = products.filter((product) => (
    product.name.toLowerCase().includes(query.toLowerCase())
    && (product.category === category || category === 'all')
  ));

  // if no products match the filter conditions
  if (activeProducts.length === 0) {
    return (
      <h3 className="no-items">{noItemsMessage}</h3>
    );
  }

  // else render the active products
  return (
    <div className="product-grid">
      {activeProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          productId={product.id}
          shoppingCart={shoppingCart}
          showDescription={false}
          handleAddItemToCart={handleAddItemToCart}
          handleRemoveItemFromCart={handleRemoveItemFromCart}
        />
      ))}
    </div>
  );
}
