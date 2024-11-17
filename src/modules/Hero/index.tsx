import one from './images/1.jpg?w=1400&webp';
import two from './images/2.jpg?w=1400&webp';
import three from './images/3.jpg?w=1400&webp';
import four from './images/4.jpg?w=1400&webp';
import Carousel from '../../components/carousel';
import CarouselItem from '../../components/carousel/carousel-item';

export const Hero = () => {
  return (
    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-10">
      <div className="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 lg:items-center">
        <div className="lg:col-span-3">
          <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl lg:text-6xl text-center lg:text-left">Welcome!</h1>
          <p className="mt-3 text-lg text-gray-800 text-center lg:text-left">Welcome to Vista Monte Mar! Enjoy a cozy stay with modern amenities in a prime location. We look forward to hosting you!</p>

          <div className="mt-5 lg:mt-8 flex flex-col items-center gap-2 sm:flex-row sm:gap-3 hidden lg:block">
            <div className="max-w-sm">
              <label htmlFor="input-label-with-helper-text" className="block text-sm font-medium mb-2 dark:text-white">Email</label>
              <input type="email" id="input-label-with-helper-text" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="email@site.com" aria-describedby="hs-input-helper-text" />
              <p className="mt-2 text-sm text-gray-500 dark:text-neutral-500" id="hs-input-helper-text">Get more information about your stay!</p>
            </div>
            <a className="w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" href="#">
              Send
            </a>
          </div>
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
