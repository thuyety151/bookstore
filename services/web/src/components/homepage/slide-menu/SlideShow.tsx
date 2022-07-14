import { Grid } from "@material-ui/core";
import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const handleDragStart = (e: any) => e.preventDefault();

const items = [
  <img
    src="https://res.cloudinary.com/dnjhqv3qw/image/upload/v1638473488/Gateway_Quote_A2_11-25_nlb6s2.jpg"
    alt="menu1"
    onDragStart={handleDragStart}
    width="100%"
  />,
  <img
    src="https://res.cloudinary.com/dnjhqv3qw/image/upload/v1638473478/Gateway_Quote_A2_11-28_vjdpr6.jpg"
    alt="menu2"
    onDragStart={handleDragStart}
    width="100%"
  />,
];

const responsive = {
  0: { items: 1 },
  568: { items: 1 },
  1024: { items: 1 },
};

const SlideEffect: React.FC = () => {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <AliceCarousel
          mouseTracking
          autoPlay
          autoPlayInterval={3000}
          infinite
          disableDotsControls
          items={items}
          responsive={responsive}
        />
      </Grid>
    </Grid>
  );
};

export default SlideEffect;
