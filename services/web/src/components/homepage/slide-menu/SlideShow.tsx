import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import image1 from "../../../assets/images/menu-1.png";
import image2 from "../../../assets/images/menu-2.png";
import image3 from "../../../assets/images/menu-3.png";


const handleDragStart = (e: any) => e.preventDefault();


const items = [
  <img src={image1} alt="menu1" onDragStart={handleDragStart} max-width="70%" width="1450px"/>,
  <img src={image2} alt="menu2" onDragStart={handleDragStart} width="1450px" />,
  <img src={image3} alt="menu3" onDragStart={handleDragStart} width="1450px"/>,
];

const responsive = {
  0: { items: 1 },
  568: { items: 1 },
  1024: { items: 1 },
};

const SlideEffect: React.FC = () => {
  return (
    <AliceCarousel mouseTracking disableDotsControls items={items} responsive={responsive}/>
  );

};

export default SlideEffect;
