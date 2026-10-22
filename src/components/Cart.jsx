
import './Cart.css'

function Cart({ cart, onClose, onIncrease, onDecrease, onCheckout }) {
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  return (
    <div className="cart-box">
      <div className="cart-header">
        <h2>Your Cart</h2>
        <button className="cart-close" onClick={onClose}>×</button>
      </div>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <p>Items in cart: {cart.reduce((total, item) => total + item.quantity, 0)}</p>

          <div className="cart-items">
            {cart.map((item, index) => (
              <div className="cart-item" key={`${item.name}-${index}`}>
                <img src={item.image} alt={item.name} />

                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>₱{item.price.toFixed(2)} each</p>

                  {item.selectedExtras && item.selectedExtras.length > 0 && (
                    <div className="cart-customizations">
                      <strong>Add-ons:</strong>
                      {item.selectedExtras.map(extra => (
                        <p key={extra.name}>
                          {extra.name} (+₱{extra.price.toFixed(2)})
                        </p>
                      ))}
                    </div>
                  )}

                  {item.selectedDrink && item.selectedDrink !== 'None' && (
                    <p className="cart-drink">Drink: {item.selectedDrink}</p>
                  )}

                  <div className="quantity-controls">
                    <button onClick={() => onDecrease(item.name, index)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onIncrease(item.name, index)}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <span>Total:</span>
            <strong>₱{cartTotal.toFixed(2)}</strong>
          </div>

         <button
  className="checkout-button"
  onClick={onCheckout}
>
  CHECKOUT
</button>
        </>
      )}
    </div>
  )
}

export default Cart
