import { Link } from 'react-router-dom'
import './bestofindia.css'
import './bestofindiaResponsive.css'

export default function Bestofindia() {
  const destinations = [
    {
      id: 1,
      title: "Make your wedding More Romantic",
      image: "https://i.pinimg.com/564x/79/22/a1/7922a18e522ede086755da933a15b50e.jpg",
      link: "/WeddingPage",
      alt: "Romantic wedding destination"
    },
    {
      id: 2,
      title: "Makes your Soul connect to Heaven",
      image: "https://i.pinimg.com/474x/a2/6a/f8/a26af82d2c28202d58a4497356b639b2.jpg",
      link: "/Temple",
      alt: "Spiritual temple destination"
    },
    {
      id: 3,
      title: "Adventure thats feel unbelievable",
      image: "https://i.pinimg.com/474x/7c/e3/81/7ce381d4f2a3f8b7d6bdfaa710f6e76b.jpg",
      link: "/adventurePage",
      alt: "Adventure destination"
    }
  ];

  return (
    <section className="destinations-section">
      <div className="destinations-container">
        <header className="destinations-header">
          <h1 className="destinations-title">DESTINATION</h1>
          <p className="destinations-subtitle">
            From historical cities to natural splendours, come see the best of India
          </p>
        </header>

        <div className="destinations-grid">
          {destinations.map((destination) => (
            <Link
              key={destination.id}
              to={destination.link}
              className="destination-link"
              aria-label={`Explore ${destination.title}`}
            >
              <article className="destination-card">
                <div className="destination-image-container">
                  <img
                    src={destination.image}
                    alt={destination.alt}
                    className="destination-image"
                    loading="lazy"
                  />
                  <div className="destination-overlay">
                    <div className="destination-content">
                      <p className="destination-text">{destination.title}</p>
                      <span className="destination-cta">Read More..</span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
