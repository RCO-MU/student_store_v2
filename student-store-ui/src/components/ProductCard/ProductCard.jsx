/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import * as React from 'react';
import { Link } from 'react-router-dom';
import formatPrice from '../currency';
import './ProductCard.css';

// **********************************************************************
// HELPER FUNCTION(S)
// **********************************************************************

// get quantity of specific product in cart
function getProductQuantity(shoppingCart, productId) {
  const productIndex = shoppingCart.findIndex((product) => product.itemId === productId);
  if (productIndex !== -1) return shoppingCart[productIndex].quantity;
  return 0;
}

export default function ProductCard({
  product, productId, shoppingCart, showDescription, handleAddItemToCart, handleRemoveItemFromCart,
}) {
  // **********************************************************************
  // CONSTANTS
  // **********************************************************************
  const quantity = getProductQuantity(shoppingCart, productId);
  const productImg = (
    <img
      className={`product-img ${showDescription ? 'detail' : ''}`}
      src={product.image}
      alt={product.name}
    />
  );

  // **********************************************************************
  // ELEMENT RENDERING
  // **********************************************************************
  return (
    <div className={`product-card-wrapper ${showDescription ? 'detail' : ''}`}>
      <span className={`product-quantity ${quantity === 0 ? 'hidden' : ''} ${showDescription ? 'detail' : ''}`}>
        {showDescription ? `In cart: ${quantity}` : `${quantity}`}
      </span>
      <div className={`product-card ${showDescription ? 'detail' : ''}`}>
        {showDescription ? productImg : (
          <Link to={`products/${productId}`} className="media">
            {productImg}
          </Link>
        )}
        <p className={`product-name ${showDescription ? 'detail' : ''}`}>{product.name}</p>
        <p className={`product-price ${showDescription ? 'detail' : ''}`}>{formatPrice(product.price)}</p>
        {showDescription ? <p className="product-description">{product.description}</p> : null}
        <button
          onClick={() => handleAddItemToCart(productId)}
          className={`add card' ${showDescription ? 'detail' : ''}`}
          type="button"
        >
          Add Item
        </button>
        <button
          onClick={() => handleRemoveItemFromCart(productId)}
          className={`remove card ${showDescription ? 'detail' : ''}`}
          type="button"
        >
          Remove Item
        </button>
      </div>
    </div>
  );
}
