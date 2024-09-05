import React from 'react';
import './Footer.css';
import xLogo from '../../assets/xLogo.webp'; // Full path to the X logo image

function Footer() {
  return (
    <footer className="footer">
      <a href="https://x.com/BBL_Drizzy_eth" target="_blank" rel="noopener noreferrer">
        <img src={xLogo} alt="X logo" className="x-logo" />
      </a>
      <p>&copy; 2024 BBLDrizzy. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
