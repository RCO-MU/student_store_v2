import * as React from 'react';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Logo from '../Logo/Logo';

// **********************************************************************
// HELPER FUNCTION(S)
// **********************************************************************

// calculates total price (and other info) of shopping cart
function getItemCount(shoppingCart) {
  let itemCount = 0;
  shoppingCart.forEach((item) => {
    itemCount += item.quantity;
  });
  return itemCount;
}

// **********************************************************************
// ELEMENT RENDERING
// **********************************************************************

export default function Navbar({ handleOnToggle, shoppingCart }) {
  return (
    <nav className="navbar" id="Navbar">
      <div className="company">
        <Logo />
        <h2 className="title">The Student Store™</h2>
      </div>
      <div id="scroller">
        <p className="scroll-to">
          <HashLink
            to="/#top"
          >
            Home
          </HashLink>
        </p>
        <p className="scroll-to cart">
          <Link
            to="/"
            onClick={handleOnToggle}
          >
            Cart
          </Link>
          <span id="cart-count">{getItemCount(shoppingCart)}</span>
        </p>
        <p className="scroll-to">
          <Link
            to="/purchases"
            onClick={() => { window.scroll(0, 0); }}
          >
            Orders
          </Link>
        </p>
        <p className="scroll-to">
          <HashLink
            smooth
            to="#About"
          >
            About
          </HashLink>

        </p>
        <p className="scroll-to">
          <HashLink
            smooth
            to="#Contact"
          >
            Contact
          </HashLink>

        </p>
      </div>
    </nav>
  );
}
