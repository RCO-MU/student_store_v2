/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import * as React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';

export default function Logo() {
  return (
    <div className="logo">
      <Link to="/">
        <img
          src="https://i.imgur.com/Ewq65P0.png"
          className="logo-img"
          alt="logo"
          role="button"
          onClick={() => { window.scrollTo(0, 0); }}
          onKeyDown={() => {}}
        />
      </Link>
    </div>
  );
}
