import one from './images/1.jpg?w=800&webp';
import two from './images/2.jpg?w=800&webp';
import three from './images/3.jpg?w=800&webp';
import four from './images/4.jpg?w=800&webp';
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
            <CarouselItem img={one} />
            <CarouselItem img={two} />
            <CarouselItem img={three} />
            <CarouselItem img={four} />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Hero;
