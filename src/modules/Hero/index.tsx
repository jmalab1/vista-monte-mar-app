import image1 from './images/image (2).jpg?w=1200&webp';
import image2 from './images/image (10).jpg?w=1200&webp';
import image3 from './images/image (12).jpg?w=1200&webp';
import image4 from './images/image (21).jpg?w=1200&webp';
import image5 from './images/image (30).jpg?w=1200&webp';
import Carousel from '../../components/carousel';
import CarouselItem from '../../components/carousel/carousel-item';
import Paragraph from '../../components/ElementWrapper/Paragraph';

export const Hero = () => {
  return (
    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-10">
      <div className="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 lg:items-center">
        <div className="lg:col-span-3">
          <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl lg:text-8xl text-center lg:text-left font-pacifico text-secondary">Welcome!</h1>
          <Paragraph>Welcome to Vista Monte Mar! Enjoy a cozy stay with modern amenities in a prime location. We look forward to hosting you!</Paragraph>
        </div>
        <div className="lg:col-span-4 mt-10 lg:mt-0">
          <Carousel>
            <CarouselItem img={image1} />
            <CarouselItem img={image2} />
            <CarouselItem img={image3} />
            <CarouselItem img={image4} />
            <CarouselItem img={image5} />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Hero;
