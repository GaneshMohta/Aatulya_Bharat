import React, { lazy, useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import Chatbot from "react-chatbot-kit";
import config from "../../components/bot/config";
import ActionProvider from "../../components/bot/ActionProvider";
import MessageParser from "../../components/bot/MessageParser";
import 'react-chatbot-kit/build/main.css';
import { IoMdChatbubbles } from "react-icons/io";
import './bestofindia.css'
import './bestofindiaResponsive.css'

export default function WeddingPage() {
  const [visible, setVisible] = useState(false);

  const isVisible = () => {
    setVisible((prevVisible) => !prevVisible);
  };

  useEffect(() => {
    window.scrollTo(1, localStorage.getItem('position'));
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="header">
        <div className="header-content">
          <div className="header-left">
            <Link to="/" className="back-button">
              <BsArrowLeftShort />
            </Link>
            <h3 className="header-title">Aatulya Bharat</h3>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="wedding">
        <div className="wedding-content animate-fade-in">
          <h1 className="weddy-h1">Make Your Wedding More Romantic</h1>
          <p className="weddy-desc">
            Create unforgettable memories with our beautifully curated wedding
            experiences. Discover enchanting venues and dreamy themes that add a
            magical touch to your special day.
          </p>
        </div>

        <div className="bg-weddy animate-slide-up">
          <img
            src="https://img.weddingbazaar.com/shaadisaga_production/photos/pictures/005/911/669/new_medium/dipak_studios2_%281%29.jpg?1675532787"
            className="weddy-img"
            alt="Wedding Background"
          />
          <div className="weddy-icon" style={{ top: '2rem', left: '-2rem' }}>❤️</div>
          <div className="weddy-icon" style={{ bottom: '4rem', left: '-2rem' }}>❤️</div>
          <div className="weddy-icon" style={{ top: '2rem', right: '-2rem', transform: 'rotate(12deg)' }}>❤️</div>
          <div className="weddy-icon" style={{ bottom: '4rem', right: '-2rem', transform: 'rotate(12deg)' }}>❤️</div>
        </div>
      </div>

      {/* Destination Weddings */}
      <div className="cards-section">
        <h1 className="cards-h1">Destination Weddings</h1>
        <div className="cards-container">
          <div className="card">
            <img
              className="weddy-cards"
              src="https://www.holidify.com/blog/wp-content/uploads/2014/09/oberoi_udaivilas.jpg"
              alt="Udaipur"
            />
            <div className="cards-hov">
              <h2>Natural</h2>
            </div>
          </div>

          <div className="card">
            <img
              className="weddy-cards"
              src="https://www.holidify.com/blog/wp-content/uploads/2014/09/umaid_bhava_palace.jpg"
              alt="Umaid Bhawan Palace"
            />
            <div className="cards-hov">
              <h2>Forts</h2>
            </div>
          </div>

          <div className="card">
            <img
              className="weddy-cards"
              src="https://www.holidify.com/blog/wp-content/uploads/2014/09/indian-wedding-in-andamans-24.jpg"
              alt="Andaman"
            />
            <div className="cards-hov">
              <h2>Beach</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Royal Weddings */}
      <div className="cards-section">
        <h1 className="cards-h1">Royal Weddings</h1>
        <div className="cards-container">
          <div className="card">
            <img
              className="weddy-cards"
              src="https://cdn0.weddingwire.in/vendor/2987/3_2/960/jpg/royal-indian-wedding-16_15_212987-1558516341.jpeg"
              alt="Royal Wedding"
            />
            <div className="cards-hov">
              <h2>Grand Style</h2>
            </div>
          </div>

          <div className="card">
            <img
              className="weddy-cards"
              src="https://www.visionvivaah.com/blog/wp-content/uploads/2019/10/Royal-wedding-theme-1-1-1024x620.jpg"
              alt="Cultural Wedding"
            />
            <div className="cards-hov">
              <h2>Cultural</h2>
            </div>
          </div>

          <div className="card">
            <img
              className="weddy-cards"
              src="https://i.pinimg.com/564x/66/73/60/667360253bdb259a249b1574d06685a4.jpg"
              alt="Royal Feel"
            />
            <div className="cards-hov">
              <h2>King's Feel</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Packages Section */}
      <div className="table-section">
        <h1 className="cards-h1">Indian Wedding Packages</h1>
        <div className="table-container">
          <table className="wedding-table">
            <tbody>
              <tr>
                <td>
                  <div className="table-row">
                    <img
                      className="tab-img"
                      src="https://www.holidify.com/blog/wp-content/uploads/2014/09/Lavasa-at-night.jpg"
                      alt="Lavasa"
                    />
                    <div className="price-container">
                      <p>₹ 12,00,000</p>
                      <span className="location">Lavasa, Maharashtra</span>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="table-row">
                    <img
                      className="tab-img"
                      src="https://www.holidify.com/blog/wp-content/uploads/2014/09/destinationweddingbackwater-1024x334.jpg"
                      alt="Mumbai"
                    />
                    <div className="price-container">
                      <p>₹ 15,00,000</p>
                      <span className="location">Mumbai, Maharashtra</span>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="table-row">
                    <img
                      className="tab-img"
                      src="https://www.holidify.com/blog/wp-content/uploads/2014/09/Royal-Wedding-at-Jodhpur.jpg"
                      alt="Jaipur"
                    />
                    <div className="price-container">
                      <p>₹ 18,00,000</p>
                      <span className="location">Jaipur, Rajasthan</span>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <table className="wedding-table">
            <tbody>
              <tr>
                <td>
                  <div className="table-row">
                    <img
                      className="tab-img"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJBb10_Tdhrmp06NaKXzUXPQhjz-NEVC_l0Q&s"
                      alt="Udaipur"
                    />
                    <div className="price-container">
                      <p>₹ 20,00,000</p>
                      <span className="location">Udaipur, Rajasthan</span>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="table-row">
                    <img
                      className="tab-img"
                      src="https://www.holidify.com/blog/wp-content/uploads/2014/09/blog_20th_March_14_4.jpg"
                      alt="Goa"
                    />
                    <div className="price-container">
                      <p>₹ 25,00,000</p>
                      <span className="location">Goa</span>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="table-row">
                    <img
                      className="tab-img"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJBb10_Tdhrmp06NaKXzUXPQhjz-NEVC_l0Q&s"
                      alt="Premium Udaipur"
                    />
                    <div className="price-container">
                      <p>₹ 26,00,000</p>
                      <span className="location">Udaipur, Rajasthan</span>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Chatbot */}
      <button onClick={isVisible} className="chatbot-button">
        <IoMdChatbubbles size={32} color="white" />
      </button>

      {visible && (
        <div className="chatbot-container">
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        </div>
      )}
    </div>
  );
}
