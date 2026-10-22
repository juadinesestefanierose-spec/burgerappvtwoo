
import './OrderConfirmation.css'

type OrderConfirmationProps = {
  orderNumber: string
  total: number
  paymentMethod: string
  onContinue: () => void
}

function OrderConfirmation({
  orderNumber,
  total,
  paymentMethod,
  onContinue
}: OrderConfirmationProps) {
  return (
    <div className="order-confirmation-overlay">
      <section className="order-confirmation-card">
        <div className="order-success-icon">✓</div>

        <p className="order-confirmation-eyebrow">DINOBITE ORDER</p>
        <h2>Order Placed Successfully!</h2>
        <p className="order-confirmation-message">
          Thank you for choosing DinoBite. Your order has been recorded.
        </p>

        <div className="order-number-box">
          <span>Your Order Number</span>
          <strong>{orderNumber}</strong>
        </div>

        <div className="order-confirmation-details">
          <div>
            <span>Payment Method</span>
            <strong>{paymentMethod}</strong>
          </div>
          <div>
            <span>Order Total</span>
            <strong>₱{total.toFixed(2)}</strong>
          </div>
        </div>

        <button
          type="button"
          className="order-continue-button"
          onClick={onContinue}
        >
          BACK TO MENU
        </button>
      </section>
    </div>
  )
}

export default OrderConfirmation
