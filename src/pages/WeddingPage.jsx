import React, { lazy, useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import Chatbot from "react-chatbot-kit";
import config from "../components/bot/config";
// const config = lazy(()=>import('../components/bot/config'))
// const ActionProvider = lazy(()=>import('../components/bot/ActionProvider'))
// const MessageParser = lazy(()=>import('../components/bot/MessageParser'))
import ActionProvider from "../components/bot/ActionProvider";
import MessageParser from "../components/bot/MessageParser";
import 'react-chatbot-kit/build/main.css';
import { IoMdChatbubbles } from "react-icons/io";
export default function WeddingPage() {
  const [visible ,setVisible] = useState(false);

  const isVisible = () => {
    setVisible((prevVisible) => !prevVisible);
};
  useEffect(()=>{
     window.scrollTo(1, localStorage.getItem('position'));
  },[])
  return (
    <div>
      <div className="flex justify-between p-2 bg-pink-300 ">
        <div className="flex gap-2">
          <Link to="/">
            <span className="text-slate-950 relative top-1">
              <BsArrowLeftShort />
            </span>
          </Link>
          <h3>Aatulya Bharat</h3>
        </div>
      </div>

      <div className="wedding">
        <div className="matemasie-regular1 text-center">
          <h1 className="weddy-h1">Make Your Wedding More Romantic</h1>
          <p className="weddy-desc">
            Create unforgettable memories with our beautifully curated wedding
            experiences. Discover enchanting venues and dreamy themes that add a
            magical touch to your special day.
          </p>
        </div>

        <div className="bg-weddy relative">
          <img
            src="https://img.weddingbazaar.com/shaadisaga_production/photos/pictures/005/911/669/new_medium/dipak_studios2_%281%29.jpg?1675532787"
            className="weddy-img"
            alt="Wedding Background"
          />

          <h1 className="weddy-icon text-8xl absolute top-10 -rotate-12 -left-10">
            ❤️
          </h1>
          <h1 className="weddy-icon text-8xl absolute bottom-16 -rotate-12 -left-10">
            ❤️
          </h1>
          <h1 className="weddy-icon text-8xl absolute top-10 rotate-12 -right-10">
            ❤️
          </h1>
          <h1 className="weddy-icon text-8xl absolute bottom-16 rotate-12 -right-10">
            ❤️
          </h1>
        </div>
      </div>
      <div>
        <h1 className="cards-h1 text-center">Destination Weddings</h1>
        <hr className="text-black p-2 font-black w-[96vw]  text-center flex justify-center ms-4"></hr>
        <div className="flex justify-around">
          <div className="relative">
            <img
              className="weddy-cards"
              src="https://www.holidify.com/blog/wp-content/uploads/2014/09/oberoi_udaivilas.jpg"
              alt="Udaipur"
            />
            <div className="cards-hov">
              <h2>Natural</h2>
            </div>
          </div>

          <div className="relative">
            <img
              className="weddy-cards"
              src="https://www.holidify.com/blog/wp-content/uploads/2014/09/umaid_bhava_palace.jpg"
              alt="Umaid Bhawan Palace"
            />
            <div className="cards-hov">
              <h2>Forts</h2>
            </div>
          </div>

          <div className="relative">
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

      <br />

      <div>
        <h1 className="text-center cards-h1">Royal Weddings</h1>
        <hr className="text-black p-2 font-black w-[90vw] text-center flex justify-center ms-2"></hr>
        <div className="flex justify-around">
          <div className="relative">
            <img
              className="weddy-cards"
              src="https://cdn0.weddingwire.in/vendor/2987/3_2/960/jpg/royal-indian-wedding-16_15_212987-1558516341.jpeg"
              alt="Udaipur"
            />
            <div className="cards-hov">
              <h2>Grand Style</h2>
            </div>
          </div>

          <div className="relative">
            <img
              className="weddy-cards"
              src="https://www.visionvivaah.com/blog/wp-content/uploads/2019/10/Royal-wedding-theme-1-1-1024x620.jpg"
              alt="Umaid Bhawan Palace"
            />
            <div className="cards-hov">
              <h2>Culturitic</h2>
            </div>
          </div>

          <div className="relative">
            <img
              className="weddy-cards"
              src="https://i.pinimg.com/564x/66/73/60/667360253bdb259a249b1574d06685a4.jpg"
              alt="Andaman"
            />
            <div className="cards-hov">
              <h2>King'S Feel </h2>
            </div>
          </div>
        </div>
      </div>
      <br />

      <div>
        <h1 className="text-center cards-h1">Indian Weddings Packages</h1>
        <div className="table-container">
          <table className="wedding-table">
            <tr>
              <td className="flex">
                <img
                  className="tab-img"
                  src="https://www.holidify.com/blog/wp-content/uploads/2014/09/Lavasa-at-night.jpg"
                  alt="Lavasa"
                />
                <div className="price-container">
                  <p>₹ 120,0000</p>
                  <span className="location">Lavasa, Maharashtra</span>
                </div>
              </td>
            </tr>
            <tr>
              <td className="flex">
                <img
                  className="tab-img"
                  src="https://www.holidify.com/blog/wp-content/uploads/2014/09/destinationweddingbackwater-1024x334.jpg"
                  alt="JW Marriott"
                />
                <div className="price-container">
                  <p>₹ 150,0000</p>
                  <span className="location">Mumbai, Maharashtra</span>
                </div>
              </td>
            </tr>
            <tr>
              <td className="flex">
                <img
                  className="tab-img"
                  src="https://www.holidify.com/blog/wp-content/uploads/2014/09/Royal-Wedding-at-Jodhpur.jpg"
                  alt="Rajvilas"
                />
                <div className="price-container">
                  <p>₹ 180,0000</p>
                  <span className="location">Jaipur, Rajasthan</span>
                </div>
              </td>
            </tr>
          </table>

          <table className="wedding-table">
            <tr>
              <td className="flex">
                <img
                  className="tab-img"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJBb10_Tdhrmp06NaKXzUXPQhjz-NEVC_l0Q&s"
                  alt="City Palace"
                />
                <div className="price-container">
                  <p>₹ 200,0000</p>
                  <span className="location">Udaipur, Rajasthan</span>
                </div>
              </td>
            </tr>
            <tr>
              <td className="flex">
                <img
                  className="tab-img"
                  src="https://www.holidify.com/blog/wp-content/uploads/2014/09/blog_20th_March_14_4.jpg"
                  alt="The Leela"
                />
                <div className="price-container">
                  <p>₹ 250,0000</p>
                  <span className="location">Goa</span>
                </div>
              </td>
            </tr>
            <tr>
              <td className="flex">
                <img
                  className="tab-img"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJBb10_Tdhrmp06NaKXzUXPQhjz-NEVC_l0Q&s"
                  alt="City Palace"
                />
                <div className="price-container">
                  <p>₹ 2600,000</p>
                  <span className="location">Udaipur, Rajasthan</span>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <button onClick={isVisible} className="fixed bottom-10 right-2 bg-black z-10 p-1 rounded-md"><IoMdChatbubbles  size={42} color="white" /></button>
{
  visible ? (<div className="fixed bottom-2 right-2"><Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      /></div>) : (<div></div>)
}

    </div>
  );
}
