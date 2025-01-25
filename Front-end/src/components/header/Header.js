import React from "react";
import "./Header.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Header() {
  const settings = {
    dots: false, // Disable dots
    infinite: true,
    autoplay:true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: (
      <div className="slick-arrow slick-next">
        <i class="fa-solid fa-chevron-right"></i>
      </div>
    ),
    prevArrow: (
      <div className="slick-arrow slick-prev">
        <i class="fa-solid fa-chevron-left"></i> 
      </div>
    ), 
  };
  return (
    <div className="header">
      <Slider {...settings}>
        <div className="header-content lifestyle">
          <div className="overlay">
            <span className="category-name">Lifestyle</span>
            <h2 className="header-h2">Colors to <em>Wear</em> This Fall</h2>
            <span className="underline-span"></span>
            <a href="/" className="header-btn">Continue Reading</a>
          </div>
        </div>
        <div className="header-content travelling">
          <div className="overlay">
            <span className="category-name">Travelling</span>
            <h2 className="header-h2">Morning <em>Coffee</em> Smells Sweet</h2>
            <span className="underline-span"></span>
            <a href="/" className="header-btn">Continue Reading</a>
          </div>
        </div>
        <div className="header-content food">
          <div className="overlay">
            <span className="category-name">Food</span>
            <h2 className="header-h2">Delicious Food <em>in</em> Breakfast</h2>
            <span className="underline-span"></span>
            <a href="/" className="header-btn">Continue Reading</a>
          </div>
        </div>
        <div className="header-content nature">
          <div className="overlay">
            <span className="category-name">Nature</span>
            <h2 className="header-h2">Christmas Came <em>Early</em> This Year</h2>
            <span className="underline-span"></span>
            <a href="/" className="header-btn">Continue Reading</a>
          </div>
        </div>
      </Slider>
    </div>
  );
}       