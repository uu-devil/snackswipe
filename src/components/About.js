import React from 'react';
import '../styles/About.css';

import vinayakImage from '../images/devil.png';
import utkarshImage from '../images/devil.png';
import mohnishImage from '../images/devil.png';
import sushantImage from '../images/devil.png';

export default function About() {
  return (
    <div className="main-content">
      <section className="about-snackswipe">
        <h1 className="about-title">Why Choose SnackSwipe?</h1>
        <div className="reasons-container">
          <div className="reason">
            <h2 className="reason-title">Convenient Ordering</h2>
            <p className="reason-description">
            With SnackSwipe, ordering your meals 
            has never been easier! You can place your order from your phone, 
            select your favorite meals, and pay seamlessly—all before even 
            stepping into the canteen.
            </p>
          </div>
          <div className="reason">
            <h2 className="reason-title">Time-Saving</h2>
            <p className="reason-description">
            Skip the long queues! SnackSwipe allows you to pre-order your meals,
             saving you time and energy during your busy day. Grab your meal with ease,
              when it's ready. </p>
          </div>
          <div className="reason">
            <h2 className="reason-title">Easy Payment</h2>
            <p className="reason-description">
            Paying for your meals is quick and secure through SnackSwipe.
             You can pay using various methods like card or UPI directly through the app,
              making transactions seamless and hassle-free.
            </p>
          </div>
          <div className="reason">
            <h2 className="reason-title">Smart Menu</h2>
            <p className="reason-description">
            Our dynamic menu adjusts based on what’s available,
             so you’ll always have fresh options to choose from. SnackSwipe ensures
              that you have a variety of meal choices at your fingertips.
            </p>
          </div>
        </div>
      </section>

      <section className="about-owners">
        <h1 className="about-title">Our Founders</h1>
        <div className="owners-container">
          <div className="owner">
            <img src={vinayakImage} alt="Vinayak Sharma" className="owner-image" />
            <h2 className="owner-name">Vinayak Sharma</h2>
            <p className="owner-description">Vinayak Sharma, our Founder with a vision to revolutionize 
              the cafeteria experience through technology. With a strong background in software
               development, he brings technical expertise to SnackSwipe.</p>
          </div>
          <div className="owner">
            <img src={utkarshImage} alt="Utkarsh Upadhayay" className="owner-image" />
            <h2 className="owner-name">Utkarsh Upadhayay</h2>
            <p className="owner-description">  Utkarsh Upadhayay, our Co-Founder who aims to enhance the 
              dining experience for students and professionals alike. He handles business 
              strategies and ensures smooth operations of SnackSwipe.</p>
          </div>
          <div className="owner">
            <img src={mohnishImage} alt="Mohnish Sahu" className="owner-image" />
            <h2 className="owner-name">Mohnish Sahu</h2>
            <p className="owner-description"> Mohnish Sahu, our Co-Founder who is a creative force behind 
              the design and user experience of SnackSwipe. He works on making the platform 
              user-friendly and visually appealing for everyone.</p>
          </div>
          <div className="owner">
            <img src={sushantImage} alt="Sushant Patil" className="owner-image" />
            <h2 className="owner-name">Sushant Patil</h2>
            <p className="owner-description"> Sushant Patil is the Co-Founder responsible for the technical 
              infrastructure and scalability of SnackSwipe. His expertise ensures that the 
              platform remains fast, reliable, and secure as it grows.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
