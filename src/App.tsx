
import './App.css'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductCard from './components/ProductCard'
import About from './components/About'
import Cart from './components/Cart'
import ProductDetails from './components/ProductDetails'
import Contact from './components/Contact'
import Checkout from './components/Checkout'
import OrderConfirmation from './components/OrderConfirmation'

import bursix from './assets/bursix.png'
import burtwo from './assets/burtwo.png'
import burthree from './assets/burthree.png'
import burone from './assets/burone.png'
import burfour from './assets/burfour.png'
import burfive from './assets/burfive.png'


type CartItem = {
  image: string
  name: string
  description: string
  price: number
  quantity: number
  basePrice?: number
  selectedExtras?: { name: string; price: number }[]
  selectedDrink?: string
}

type Product = {
  image: string
  name: string
  description: string
  price: number
  rating: string
  reviews: string
}

function App() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
const [orderReference, setOrderReference] = useState('')
const [orderMessage, setOrderMessage] = useState('')
const [confirmedOrderTotal, setConfirmedOrderTotal] = useState(0)
const [confirmedPaymentMethod, setConfirmedPaymentMethod] = useState('')

  const products: Product[] = [
    {
      image: bursix,
      name: 'Volcano Burger',
      description: 'Juicy beef burger with melted cheese and our signature DinoBite sauce.',
      price: 199,
      rating: '4.5',
      reviews: '124'
    },
    {
      image: burtwo,
      name: 'Cheesy T-Rex',
      description: 'A cheesy beast loaded with juicy beef and extra melted goodness.',
      price: 249,
      rating: '4.5',
      reviews: '124'
    },
    {
      image: burthree,
      name: 'Dino Classic',
      description: 'A classic juicy beef burger with melted cheese, fresh lettuce, our signature DinoBite sauce.',
      price: 199,
      rating: '4.9',
      reviews: '156'
    },
    {
      image: burfour,
      name: 'Jurassic BBQ',
      description: 'Juicy beef, smoky BBQ sauce, crispy onions, melted cheese packed into one wild bite.',
      price: 229,
      rating: '4.8',
      reviews: '132'
    },
    {
      image: burfive,
      name: 'Raptor Crunch',
      description: 'A crispy and juicy burger loaded with crunchy toppings and creamy signature sauce.',
      price: 219,
      rating: '4.7',
      reviews: '98'
    },
    {
      image: burone,
      name: 'Fossil Melt',
      description: 'A cheesy burger stacked with savory beef, melted cheese, and delicious DinoBite toppings.',
      price: 239,
      rating: '4.6',
      reviews: '87'
    }
  ]

  
const addToCart = (product: Omit<CartItem, 'quantity'>) => {
  setCart(currentCart => {
    const existingIndex = currentCart.findIndex(item =>
      item.name === product.name &&
      JSON.stringify(item.selectedExtras ?? []) ===
        JSON.stringify(product.selectedExtras ?? []) &&
      (item.selectedDrink ?? 'None') === (product.selectedDrink ?? 'None')
    )

    if (existingIndex !== -1) {
      return currentCart.map((item, index) =>
        index === existingIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    }

    return [...currentCart, { ...product, quantity: 1 }]
  })
}


  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  )

const increaseQuantity = (name: string, index: number) => {
  setCart(currentCart =>
    currentCart.map((item, i) =>
      i === index && item.name === name
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  )
}

const decreaseQuantity = (name: string, index: number) => {
  setCart(currentCart =>
    currentCart
      .map((item, i) =>
        i === index && item.name === name
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0)
  )
}

const placeOrder = (paymentMethod: string) => {
  if (cart.length === 0) return

  const reference = `DB-${Date.now().toString().slice(-8)}`
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  setOrderReference(reference)
  setConfirmedOrderTotal(total)
  setConfirmedPaymentMethod(paymentMethod)

  setCart([])
  setIsCheckoutOpen(false)
  setIsCartOpen(false)
  setOrderMessage('')
}


  return (
    <>
      <Navbar
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
      />

      <Hero />

      <div id="menu" className="product-row">
        {products.map(product => (
          <ProductCard
            key={product.name}
            image={product.image}
            name={product.name}
            price={product.price}
            onClick={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      <About />

<Contact />

      {selectedProduct && (
        <ProductDetails
          key={selectedProduct.name}
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          
onAddToCart={(product: Product & {
  basePrice?: number
  selectedExtras?: { name: string; price: number }[]
  selectedDrink?: string
}) => {
  addToCart({
    image: product.image,
    name: product.name,
    description: product.description,
    price: product.price,
    basePrice: product.basePrice ?? product.price,
    selectedExtras: product.selectedExtras ?? [],
    selectedDrink: product.selectedDrink ?? 'None'
  })
  setSelectedProduct(null)
}}

        />
      )}

     
{isCartOpen && (
 <Cart
  cart={cart}
  onClose={() => setIsCartOpen(false)}
  onIncrease={increaseQuantity}
  onDecrease={decreaseQuantity}
  onCheckout={() => {
    setIsCartOpen(false)
    setIsCheckoutOpen(true)
    
  }}
/>
)}
{isCheckoutOpen && (
  <Checkout
    total={cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )}
    onClose={() => setIsCheckoutOpen(false)}
    onPlaceOrder={placeOrder}
  />
)}

{orderMessage && (
  <div className="order-confirmation">
    <h2>Thank you for ordering!</h2>
    <p>{orderMessage}</p>
    <p>
      Order reference: <strong>{orderReference}</strong>
    </p>
    <button onClick={() => setOrderMessage('')}>
      Continue Shopping
    </button>
  </div>
)}
const [orderMessage, setOrderMessage] = useState('')

{orderReference && (
  <OrderConfirmation
    orderNumber={orderReference}
    total={confirmedOrderTotal}
    paymentMethod={confirmedPaymentMethod}
    onContinue={() => {
      setOrderReference('')
      setConfirmedOrderTotal(0)
      setConfirmedPaymentMethod('')
      setOrderMessage('')
    }}
  />
)}

    </>
  )
}

export default App
