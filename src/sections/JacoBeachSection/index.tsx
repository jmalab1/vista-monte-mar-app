import { Card, CardBody } from '@material-tailwind/react';
import {
  PencilSquareIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ChartPieIcon,
  LightBulbIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';
import RestaurantDetails from '../../modules/RestaurantDetails';
import EmergencyDetails from '../../modules/EmergencyDetails';
import ThingsToDoDetails from '../../modules/ThingsToDoDetails';
import NoteworthyDetails from '../../modules/NoteworthyDetails';
import SectionHeader from '../../components/heading/SectionHeader';
import CategoryCard from '../../components/Categories/CategoryCard';
import _ from 'lodash';
import AbbLogo from '../../modules/Logos/AbbLogo';
import VrboLogo from '../../modules/Logos/VrboLogo';

let categories = [
  {
    id: 'restaurants',
    img: '/image/food.jpg',
    icon: ChartPieIcon,
    title: 'Restaurants',
    desc: 'Looking for a bite to eat?',
    active: true,
    attribution: "Photo by @rosalindjchang"
  },
  {
    id: 'things_to_do',
    img: '/image/beach-top-view.jpg',
    icon: LightBulbIcon,
    title: 'Things To Do',
    desc: 'Explore Jaco',
    active: false,
    attribution: "Photo by @photosbychalo"
  },
  {
    id: 'emergency',
    img: '/image/emergency.jpg',
    icon: ChatBubbleOvalLeftEllipsisIcon,
    title: 'Emergency',
    desc: 'Need urgent help?',
    active: false,
    attribution: "Photo by @charlesdeluvio"
  },
  {
    id: 'noteworthy',
    img: '/image/mountain.jpg',
    icon: PencilSquareIcon,
    title: 'Noteworthy',
    desc: 'Looking for more?',
    active: false,
    attribution: "Photo by @hiking_corgi"
  },
];

export const JacoBeachSection = () => {
  const [hiddenDivState, setHiddenDivState] = useState('restaurants');

  const cardClickCallbackHandler = (id: string) => {
    _.each(categories, (category) => {
      category.active = false;

      if (id == category.id) {
        category.active = true;
      }
    });
    setHiddenDivState(id);
  };

  return (
    <section className="px-8 pb-20 pt-20 lg:pt-0 bg-base-200 shadow-xl" id="jaco_beach">
      <div className="mb-10 grid place-items-center text-center">
        <SectionHeader
          title="Jaco Beach"
        >
          <p className='!text-nuetral lg:w-6/12 text-lg'>Jaco is a vibrant coastal destination in Costa Rica, known for its stunning beaches, lively nightlife, and rich biodiversity, below are some ideas to get you pumped.</p>
        </SectionHeader>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 md:ml-32 md:mr-32">
        <Card
          className="relative grid h-full w-full place-items-center overflow-hidden text-center bg-nuetral shadow-xl bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-cyan-500 via-blue-600 to-indigo-500"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
          <CardBody
            className="relative w-full"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <p className="mt-9 text-white text-2xl">Book With Us</p>
            <p className="mt-4 mb-14 font-normal text-white opacity-50">
              Enjoy our condo steps from the Pacific coast! Perfect for 4
              guests, it features modern amenities, a pool, and easy access to
              local adventures. Book now for your Costa Rica getaway!s
            </p>
            <div className="flex gap-6 text-white justify-center">
              <AbbLogo size={40} />
              <VrboLogo size={40} />
            </div>
          </CardBody>
        </Card>
        <div className="col-span-1 flex flex-col gap-6">
          {categories.slice(0, 2).map((props, key) => (
            <CategoryCard
              key={key}
              {...props}
              callback={cardClickCallbackHandler}
            />
          ))}
        </div>
        <div className="col-span-1 flex flex-col gap-6">
          {categories.slice(2, 4).map((props, key) => (
            <CategoryCard
              key={key}
              {...props}
              callback={cardClickCallbackHandler}
            />
          ))}
        </div>
      </div>
      <div className="md:ml-32 md:mr-32">
        {hiddenDivState == 'restaurants' && <RestaurantDetails />}
        {hiddenDivState == 'emergency' && <EmergencyDetails />}
        {hiddenDivState == 'things_to_do' && <ThingsToDoDetails />}
        {hiddenDivState == 'noteworthy' && <NoteworthyDetails />}
      </div>
    </section>
  );
};

export default JacoBeachSection;
