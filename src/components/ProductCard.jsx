
import './ProductCard.css';

function ProductCard({
  image,
  name,
  price,
  onClick
}) {
  return (
    <div
      className="product-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick();
        }
      }}
    >
      <img
        src={image}
        alt={name}
        className="product-image"
      />

      <h2>{name}</h2>

      <p className="product-price">₱{price}</p>
    </div>
  );
}

export default ProductCard;
