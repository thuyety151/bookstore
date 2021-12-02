import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";



const handleDragStart = (e: any) => e.preventDefault();


const items = [
  <img src="https://res.cloudinary.com/dnjhqv3qw/image/upload/v1638473488/Gateway_Quote_A2_11-25_nlb6s2.jpg" alt="menu1" onDragStart={handleDragStart} width="1450px"/>,
  <img src="https://res.cloudinary.com/dnjhqv3qw/image/upload/v1638473478/Gateway_Quote_A2_11-28_vjdpr6.jpg" alt="menu2" onDragStart={handleDragStart} width="1450px" />,
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

