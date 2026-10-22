import './Navbar.css';
import logo from '../assets/dinobite.png';

function Navbar({ cartCount, onCartClick  }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="DinoBite Logo" />
      </div>

      <div className="navbar-links">
        <a href="#about">ABOUT</a>
        <a href="#menu">OUR MENU</a>
        <a href="#contact">CONTACT</a>

        <div className="cart" onClick={onCartClick}>
          <span className="cart-icon">🛒</span>
          <span className="cart-badge">{cartCount}</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;