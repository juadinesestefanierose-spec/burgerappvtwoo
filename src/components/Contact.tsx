
import './Contact.css'

function Contact() {
  return (
    <section id="contact" className="contact-section">
      <p className="contact-eyebrow">WE WOULD LOVE TO HEAR FROM YOU</p>
      <h2>CONTACT US</h2>
      <p className="contact-description">
        Have a question about our burgers or your order?
        Get in touch with the DinoBite team.
      </p>

      <div className="contact-details">
        <div className="contact-item">
          <h3>Email</h3>
          <p>dinobite@gmail.com</p>
        </div>

        <div className="contact-item">
          <h3>Phone</h3>
          <p>+1 (555) 123-4567</p>
        </div>

        <div className="contact-item">
          <h3>Location</h3>
          <p>123 DinoBite Street, Jurassic Park</p>
        </div>
      </div>
    </section>
  )
}

export default Contact
