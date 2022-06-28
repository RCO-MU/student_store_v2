import * as React from 'react';
import { HashLink } from 'react-router-hash-link';
import './Navbar.css';
import Logo from '../Logo/Logo';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Logo />
      <h2 className="title">The Student Store™</h2>
      <div id="scroller">
        <p className="scroll-to"><HashLink smooth to="/" onClick={() => { window.scroll(0, 0); }}> Home </HashLink></p>
        <p className="scroll-to"><HashLink smooth to="#About"> About </HashLink></p>
        <p className="scroll-to"><HashLink smooth to="#Contact"> Contact </HashLink></p>
      </div>
    </nav>
  );
}
