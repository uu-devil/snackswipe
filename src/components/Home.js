import React, { useState, useEffect } from 'react';
import '../styles/Home.css';

// Images for header slideshow
import collegeImage from "../images/college.png";
import officeImage from "../images/office.png";

// Slideshow Images
import slide1 from "../images/slide1.jpg";
import slide2 from "../images/slide2.jpg";
import slide3 from "../images/slide3.jpg";

export default function Home() {
  const [headerImageIndex, setHeaderImageIndex] = useState(0);
  const [slideshowImageIndex, setSlideshowImageIndex] = useState(0);

  // Images for the header slideshow
  const headerImages = [collegeImage, officeImage];

  // Images for the main slideshow
  const slideshowImages = [slide1, slide2, slide3];

  // Change header image every 3 seconds
  useEffect(() => {
    const headerInterval = setInterval(() => {
      setHeaderImageIndex((prevIndex) => (prevIndex + 1) % headerImages.length);
    }, 3000); // 3 seconds interval

    return () => clearInterval(headerInterval);
  }, []);

  // Change main slideshow image every 3 seconds
  useEffect(() => {
    const slideshowInterval = setInterval(() => {
      setSlideshowImageIndex((prevIndex) => (prevIndex + 1) % slideshowImages.length);
    }, 3000); // 3 seconds interval

    return () => clearInterval(slideshowInterval);
  }, []);

  return (
    <div className="home-container">
      <h1 className="title">Smart Cafeteria</h1>
      
      {/* Header Slideshow */}
      <div className="header-slideshow">
        <img 
          src={headerImages[headerImageIndex]} 
          alt="Header Slideshow" 
          className="header-image" 
        />
      </div>

      {/* Main Slideshow Section */}
      <div className="slideshow-container">
        <img 
          src={slideshowImages[slideshowImageIndex]} 
          alt="Slideshow Image" 
          className="slideshow-image" 
        />
      </div>

<footer className="footer">
  <div className="footer-bottom">
    <p>&copy; {new Date().getFullYear()} SnackSwipe. All Rights Reserved.</p>
  </div>
</footer>
    </div>
  );
}