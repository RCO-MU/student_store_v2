import * as React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';

export default function Logo() {
  return (
    <div className="logo">
      <Link to="/">
        <img src="https://i.imgur.com/479SpGXl.png" className="logo-img" alt="logo" />
      </Link>
    </div>
  );
}
