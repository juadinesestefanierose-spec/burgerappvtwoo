
import { useState } from 'react'
import './Checkout.css'

type CheckoutProps = {
  total: number
  onClose: () => void
  onPlaceOrder: (paymentMethod: string) => void
}

function Checkout({ total, onClose, onPlaceOrder }: CheckoutProps) {
  const [paymentMethod, setPaymentMethod] = useState('Cash')

  return (
    <div className="checkout-overlay">
      <section className="checkout-panel">
        <button
          type="button"
          className="checkout-close"
          onClick={onClose}
          aria-label="Close checkout"
        >
          ×
        </button>

        <h2>Checkout</h2>
        <p>Please review your order before continuing.</p>

        <div className="checkout-summary">
          <span>Order total</span>
          <strong>₱{total.toFixed(2)}</strong>
        </div>

        <h3>Payment method</h3>

        <label className="payment-option">
          <input
            type="radio"
            name="payment"
            value="Cash"
            checked={paymentMethod === 'Cash'}
            onChange={() => setPaymentMethod('Cash')}
          />
          Cash
        </label>

        <label className="payment-option">
          <input
            type="radio"
            name="payment"
            value="Cashless"
            checked={paymentMethod === 'Cashless'}
            onChange={() => setPaymentMethod('Cashless')}
          />
          Cashless
        </label>

        <button
          type="button"
          className="place-order-button"
          onClick={() => onPlaceOrder(paymentMethod)}
        >
          PLACE ORDER
        </button>
      </section>
    </div>
  )
}

export default Checkout
