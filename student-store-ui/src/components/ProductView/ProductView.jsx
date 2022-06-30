import * as React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import './ProductView.css';

export default function ProductView({
  product, productId, shoppingCart, handleAddItemToCart, handleRemoveItemFromCart,
}) {
  return (
    <div className="product-view">
      <Link
        to="/"
      >
        <button className="back" type="button">
          ← Back to products
        </button>
      </Link>
      <h1 className="product-id">
        Product #
        {productId}
      </h1>
      <ProductCard
        key={productId}
        product={product}
        productId={productId}
        shoppingCart={shoppingCart}
        showDescription
        handleAddItemToCart={handleAddItemToCart}
        handleRemoveItemFromCart={handleRemoveItemFromCart}
      />
    </div>
  );
}
