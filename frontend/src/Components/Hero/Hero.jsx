import React from "react";
import "./Hero.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import heroImage from "../Assets/homebanner1.jpg";
import homeBanner1 from "../Assets/homebanner4.jpg";
import homeBanner2 from "../Assets/homebanner3.jpg";

const carouselImages = [
  {
    id: 1,
    src: heroImage,
    alt: "Delicious Dish 1",
    caption: "Tasty and Delicious Dish 1",
  },
  {
    id: 2,
    src: homeBanner2,
    alt: "Delicious Dish 2",
    caption: "Exquisite Flavors of Dish 2",
  },
  {
    id: 3,
    src: homeBanner1,
    alt: "Delicious Dish 3",
    caption: "Satisfy Your Hunger with Dish 3",
  },
];

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Show 1 image at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Time before automatically scrolling
    responsive: [
      {
        breakpoint: 1024, // Breakpoint for desktop
        settings: {
          slidesToShow: 1, // One image per screen
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768, // Breakpoint for tablets
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Breakpoint for mobile devices
        settings: {
          slidesToShow: 1, // On mobile show 1 image
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="hero-container">
      <div className="hero">
        <div className="hero-image">
          <Slider {...settings}>
            {carouselImages.map((image) => (
              <div key={image.id} className="image-container">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="carousel-image"
                />
                <div className="carousel-caption">
                  <h2>{image.caption}</h2>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="content-section">
        <h2>Welcome to Harini's Food Haven</h2>
        <p>
          At Harini's Food Haven, we bring you the finest dishes made from the
          freshest ingredients. Our chefs are dedicated to providing
          mouth-watering flavors in every bite, whether you’re here for a quick
          snack or a gourmet meal. Browse through our menu and discover a world
          of taste.
        </p>
        <button className="explore-btn">Explore Menu</button>
      </div>
    </div>
  );
};

export default Hero;
