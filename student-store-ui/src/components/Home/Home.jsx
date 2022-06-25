/* eslint-disable react/prop-types */
import * as React from 'react';
import './Home.css';
import Hero from '../Hero/Hero';
import ProductGrid from '../ProductGrid/ProductGrid';

export default function Home({
  products, shoppingCart, query, category, isFetching, handleAddItemToCart,
  handleRemoveItemFromCart, handleQueryChange, handleCategoryChange,
}) {
  return (
    <div className="home">
      <Hero />
      <input
        className="product-query"
        type="input"
        name="query"
        placeholder="Search for products"
        onChange={(e) => handleQueryChange(e.target.value)}
        value={query}
      />
      <button className="search-button" type="button">
        <img
          className="search-icon"
          src="https://i.imgur.com/Q0cXzWQ.png"
          alt="search button"
        />
      </button>
      <select
        name="categories"
        id="categories"
        onChange={(e) => handleCategoryChange(e.target.value)}
      >
        <option value="all">All Categories</option>
        <option value="clothing">Clothing</option>
        <option value="food">Food</option>
        <option value="accessories">Accessories</option>
        <option value="tech">Tech</option>
      </select>
      <ProductGrid
        products={products}
        query={query}
        category={category}
        isFetching={isFetching}
        handleAddItemToCart={handleAddItemToCart}
        handleRemoveItemFromCart={handleRemoveItemFromCart}
        shoppingCart={shoppingCart}
      />
    </div>
  );
}
