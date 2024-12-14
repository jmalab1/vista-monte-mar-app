import { Card, CardBody } from '@material-tailwind/react';
import {
  PencilSquareIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ChartPieIcon,
  LightBulbIcon,
  CurrencyDollarIcon,
  BuildingStorefrontIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';
import RestaurantDetails from '../../modules/RestaurantDetails';
import EmergencyDetails from '../../modules/EmergencyDetails';
import ThingsToDoDetails from '../../modules/ThingsToDoDetails';
import NoteworthyDetails from '../../modules/NoteworthyDetails';
import GroceryDetails from '../../modules/GroceryDetails';
import SectionHeader from '../../components/heading/SectionHeader';
import CategoryCard from '../../components/Categories/CategoryCard';
import _ from 'lodash';
import AbbLogo from '../../modules/Logos/AbbLogo';
import VrboLogo from '../../modules/Logos/VrboLogo';
import PFood from './images/food.jpg?w=600&webp';
import PThingsTodo from './images/things_to_do.jpg?w=600&webp';
import PEmergency from './images/emergency.jpg?w=600&webp';
import PNoteworthy from './images/artwork.jpg?w=600&webp';
import PGrocery from './images/grocery.jpg?w=600&webp';
import PBank from './images/atm.jpg?w=600&webp';
import Paragraph from '../../components/ElementWrapper/Paragraph';
import BankDetails from '../../modules/BankDetails';

let categories = [
  {
    id: 'restaurants',
    img: PFood,
    icon: ChartPieIcon,
    title: 'Restaurants',
    desc: 'Looking for a bite to eat?',
    active: true,
  },
  {
    id: 'things_to_do',
    img: PThingsTodo,
    icon: LightBulbIcon,
    title: 'Things To Do',
    desc: 'Explore Jaco',
    active: false,
  },
  {
    id: 'emergency',
    img: PEmergency,
    icon: ChatBubbleOvalLeftEllipsisIcon,
    title: 'Emergency',
    desc: 'Need urgent help?',
    active: false,
    attribution: 'Photo by @charlesdeluvio',
    photo_link:
      'https://unsplash.com/@charlesdeluvio?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash',
  },
  {
    id: 'noteworthy',
    img: PNoteworthy,
    icon: PencilSquareIcon,
    title: 'Noteworthy',
    desc: 'Looking for more?',
    active: false,
  },
  {
    id: 'groceries',
    img: PGrocery,
    icon: BuildingStorefrontIcon,
    title: 'Groceries',
    desc: 'Make sure to have the necessities',
    active: false,
  },
  {
    id: 'banks',
    img: PBank,
    icon: CurrencyDollarIcon,
    title: 'Banks',
    desc: 'Short on cash?',
    active: false,
    attribution: 'Photo by @julian21',
    photo_link:
      'https://unsplash.com/@julian21?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash',
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
    <section className="px-8 pb-10 bg-base-200 shadow-xl" id="jaco_beach">
      <div className="mb-10 grid place-content-center md:ml-56 md:mr-56">
        <SectionHeader title="Jaco Beach" centerText={true}>
          <Paragraph>
            Jaco is the most developed beach town on the Pacific Coast of Costa
            Rica. Located in the province of Puntarenas, it is known for its
            beautiful beach sceneries, stunning sunset, surfing waves, and
            various nature-centered activities. Below are some information to
            get you pumped for your visit.
          </Paragraph>
        </SectionHeader>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-5 lg:grid-rows-2 gap-4 md:ml-32 md:mr-32">
        <Card
          className="relative col-span-2 row-span-2 h-full w-full place-items-center overflow-hidden text-center bg-nuetral shadow-xl bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-cyan-500 via-blue-600 to-indigo-500"
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
              local adventures. Book now for your Costa Rica getaway!
            </p>
            <div className="flex gap-6 text-white justify-center">
              <AbbLogo size={40} />
              <VrboLogo size={40} />
            </div>
          </CardBody>
        </Card>

        {categories.map((props, key) => (
          <div className={`row-start-${key}`}>
            <CategoryCard
              key={key}
              {...props}
              callback={cardClickCallbackHandler}
            />
          </div>
        ))}
      </div>
      <div className="md:ml-32 md:mr-32">
        {hiddenDivState == 'restaurants' && <RestaurantDetails />}
        {hiddenDivState == 'emergency' && <EmergencyDetails />}
        {hiddenDivState == 'things_to_do' && <ThingsToDoDetails />}
        {hiddenDivState == 'noteworthy' && <NoteworthyDetails />}
        {hiddenDivState == 'groceries' && <GroceryDetails />}
        {hiddenDivState == 'banks' && <BankDetails />}
      </div>
    </section>
  );
};

export default JacoBeachSection;
