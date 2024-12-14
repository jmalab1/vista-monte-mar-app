import { FunctionComponent } from 'react';

type CarouselItemType = {
  img: string;
};

const CarouselItem: FunctionComponent<CarouselItemType> = ({ img }) => {
  return (
    <div className="hs-carousel-slide">
      <div className="flex justify-center h-full bg-gray-300 p-6">
        <img
          src={img}
          className="self-center text-4xl text-gray-800 transition duration-700"
        />
      </div>
    </div>
  );
};

export default CarouselItem;
