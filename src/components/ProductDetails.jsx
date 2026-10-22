
import { useState } from 'react'
import './ProductDetails.css'

const extras = [
  { name: 'Extra cheese', price: 20 },
  { name: 'Extra patty', price: 50 },
  { name: 'Extra bacon', price: 35 },
  { name: 'Mayonnaise', price: 10 },
  { name: 'DinoBite sauce', price: 10 },
  { name: 'French fries', price: 50 },
  { name: 'Onion rings', price: 45 }
]

const drinks = [
  { name: 'None', price: 0 },
  { name: 'Bottled water', price: 20 },
  { name: 'Coke', price: 35 },
  { name: 'Sprite', price: 35 },
  { name: 'Iced tea', price: 30 }
]

function ProductDetails({ product, onClose, onAddToCart }) {
  const [selectedExtras, setSelectedExtras] = useState([])
  const [selectedDrink, setSelectedDrink] = useState('None')

  if (!product) return null

  const extrasTotal = extras
    .filter(item => selectedExtras.includes(item.name))
    .reduce((total, item) => total + item.price, 0)

  const selectedDrinkInfo = drinks.find(
    item => item.name === selectedDrink
  )

  const drinkPrice = selectedDrinkInfo?.price ?? 0
  const total = Number(product.price) + extrasTotal + drinkPrice

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      price: total,
      basePrice: Number(product.price),
      selectedExtras: extras.filter(item =>
        selectedExtras.includes(item.name)
      ),
      selectedDrink
    })
  }

  return (
    <div
      className="product-modal-overlay"
      onClick={onClose}
      role="presentation"
    >
      <section
        className="product-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`${product.name} details`}
        onClick={event => event.stopPropagation()}
      >
        <button
          type="button"
          className="product-modal-close"
          onClick={onClose}
          aria-label="Close product details"
        >
          ×
        </button>

        <div className="product-modal-content">
          <img
            src={product.image}
            alt={product.name}
            className="product-modal-image"
          />

          <div className="product-modal-info">
            <p className="product-modal-eyebrow">DINOBITE FAVORITE</p>
            <h2>{product.name}</h2>

            <p className="product-modal-rating">
              <span aria-hidden="true">★</span> {product.rating}
              <span className="product-modal-reviews">
                ({product.reviews} reviews)
              </span>
            </p>

            <p className="product-modal-description">
              {product.description}
            </p>

            <p className="product-modal-base-price">
              Base price <strong>₱{Number(product.price).toFixed(2)}</strong>
            </p>

            <div className="addon-section">
              <div className="addon-heading">
                <h3>Customize your burger</h3>
                <span>Optional</span>
              </div>

              {extras.map(item => (
                <label className="addon-option" key={item.name}>
                  <span className="addon-label">
                    <input
                      type="checkbox"
                      checked={selectedExtras.includes(item.name)}
                      onChange={event => {
                        setSelectedExtras(current =>
                          event.target.checked
                            ? [...current, item.name]
                            : current.filter(name => name !== item.name)
                        )
                      }}
                    />
                    {item.name}
                  </span>

                  <span className="addon-price">
                    +₱{item.price.toFixed(2)}
                  </span>
                </label>
              ))}
            </div>

            <div className="addon-section drink-section">
              <div className="addon-heading">
                <h3>Choose a drink</h3>
                <span>Optional</span>
              </div>

              {drinks.map(item => (
                <label className="addon-option" key={item.name}>
                  <span className="addon-label">
                    <input
                      type="radio"
                      name={`drink-${product.name}`}
                      checked={selectedDrink === item.name}
                      onChange={() => setSelectedDrink(item.name)}
                    />
                    {item.name}
                  </span>

                  <span className="addon-price">
                    {item.price > 0
                      ? `+₱${item.price.toFixed(2)}`
                      : 'Free'}
                  </span>
                </label>
              ))}
            </div>

            <div className="product-modal-total">
              <div>
                <span className="total-label">Total price</span>
                <span className="total-note">Including selected extras</span>
              </div>

              <strong>₱{total.toFixed(2)}</strong>
            </div>

            <button
              type="button"
              className="product-modal-add"
              onClick={handleAddToCart}
            >
              ADD TO CART · ₱{total.toFixed(2)}
            </button>

            <p className="product-modal-footer">
              Made fresh for your next dino-sized craving!
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductDetails
