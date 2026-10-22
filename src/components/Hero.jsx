import { useEffect, useState } from 'react';
import './Hero.css';

import burgerOne from '../assets/burgerone.png';
import burgerTwo from '../assets/burgertwo.png';
import burgerThree from '../assets/burgerthree.png';
import burgerFour from '../assets/burgerfour.png';

const slides = [
  {
    image: burgerOne,
    flavor: 'DINO CLASSIC',
    title: 'BITE INTO SOMETHING WILD!',
    description: 'Juicy beef, melted cheese, fresh lettuce, and our signature DinoBite sauce.',
  },
  {
    image: burgerTwo,
    flavor: 'CHEESY T-REX',
    title: 'MEAT. CHEESE. PURE CHAOS.',
    description: 'A cheesy beast loaded with juicy beef and extra melted goodness.',
  },
  {
    image: burgerThree,
    flavor: 'JURASSIC BBQ',
    title: 'YOUR NEXT FAVORITE BURGER',
    description: 'Smoky BBQ flavor, crispy toppings, and a juicy burger made to satisfy.',
  },
  {
    image: burgerFour,
    flavor: 'VOLCANO BURGER',
    title: 'FEED YOUR INNER DINO!',
    description: 'A bold and fiery burger for those who like their bites with a little adventure.',
  },
];

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${slide.image})` }}
    >
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <p className="hero-flavor">{slide.flavor}</p>

        <h1>{slide.title}</h1>

        <p className="hero-description">{slide.description}</p>
      </div>

      <div className="hero-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={index === currentSlide ? 'active' : ''}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          >
            ●
          </button>
        ))}
      </div>
    </section>
  );
}

export default Hero;