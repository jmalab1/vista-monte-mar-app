import jacosign from '../../assets/nature/image (1).jpg?w=1200&webp';
import lr1 from '../../assets/living_room/image (3).jpg?w=1200&webp';
import k1 from '../../assets/kitchen/image (5).jpg?w=1200&webp';
import k2 from '../../assets/kitchen/image (4).jpg?w=1200&webp';
import pool from '../../assets/common/image (2).jpg?w=1200&webp';
import Carousel from '../../components/carousel';
import CarouselItem from '../../components/carousel/carousel-item';
import Paragraph from '../../components/ElementWrapper/Paragraph';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-10">
      <div className="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 lg:items-center">
        <div className="lg:col-span-3">
          <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl lg:text-8xl text-center lg:text-left font-pacifico text-secondary">
            Welcome!
          </h1>
          <Paragraph>
            Welcome to Vista Monte Mar! Enjoy a cozy stay with modern amenities
            in a prime location. We look forward to hosting you!
          </Paragraph>
          <Link to="/gallery">
            <button className="btn btn-sm btn-secondary text-base-100">
              Want to see more photos?
            </button>
          </Link>
        </div>
        <div className="lg:col-span-4 mt-10 lg:mt-0">
          <Carousel>
            <CarouselItem img={jacosign} />
            <CarouselItem img={lr1} />
            <CarouselItem img={k1} />
            <CarouselItem img={k2} />
            <CarouselItem img={pool} />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Hero;
