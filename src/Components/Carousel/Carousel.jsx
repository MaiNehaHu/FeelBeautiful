import React, { useEffect, useState } from "react";
import "./carousel.css";
import image1 from "../../Images/image1.png";
import image2 from "../../Images/image2.jpg";
import image3 from "../../Images/image3.png";
import image4 from "../../Images/image4.jpg";
import image5 from "../../Images/image5.jpg";
import image6 from "../../Images/image6.jpg";
import image7 from "../../Images/image7.jpg";
import image8 from "../../Images/image8.jpg";
import image9 from "../../Images/image9.jpg";
import image10 from "../../Images/image10.jpg";

const Carousel = () => {
  const [count, setCount] = useState(0);
  const [forward, setForward] = useState(true);
  const [marginLeff, setMarginLeff] = useState(0);

  /**For images to shift */
  function SetSlide(count) {
    switch (count) {
      case 0:
        setMarginLeff("0%");
        break;
      case 1:
        setMarginLeff("-10%");
        break;
      case 2:
        setMarginLeff("-20%");
        break;
      case 3:
        setMarginLeff("-30%");
        break;
      case 4:
        setMarginLeff("-40%");
        break;
      case 5:
        setMarginLeff("-50%");
        break;
      case 6:
        setMarginLeff("-60%");
        break;
      case 7:
        setMarginLeff("-70%");
        break;
      case 8:
        setMarginLeff("-80%");
        break;
      case 9:
        setMarginLeff("-90%");
        break;
    }
  }

  /**Carousel looping */
  if (forward) {
    //when starting from 1st image go forward
    for (let i = 0; i < 9; i++) {
      setTimeout(() => {
        if (count === 9) {
          setForward(false);
        } else {
          setCount(count + 1);
          SetSlide(count);
        }
      }, 6000);
    }
  } else {
    //when touched last image go backward
    for (let i = 9; i > 0; i--) {
      setTimeout(() => {
        if (count === 0) {
          setForward(true);
        } else {
          setCount(count - 1);
          SetSlide(count);
        }
      }, 6000);
    }
  }

  return (
    <React.Fragment>
      
      <div className="showOffPage">
        <section className="Message">
          <p>
            Buy your <span>favourite </span> products.
          </p>
        </section>

        <section className="carousel-container">
          <div className="images">
            <div className="image pic-1" style={{ marginLeft: marginLeff }}>
              <img src={image1} alt="image1" />
            </div>
            <div className="image">
              <img src={image2} alt="image2" />
            </div>
            <div className="image">
              <img src={image3} alt="image3" />
            </div>
            <div className="image">
              <img src={image4} alt="image4" />
            </div>
            <div className="image">
              <img src={image5} alt="image5" />
            </div>
            <div className="image">
              <img src={image6} alt="image6" />
            </div>
            <div className="image">
              <img src={image7} alt="image7" />
            </div>
            <div className="image">
              <img src={image8} alt="image8" />
            </div>
            <div className="image">
              <img src={image9} alt="image9" />
            </div>
            <div className="image">
              <img src={image10} alt="image10" />
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};

export default Carousel;
