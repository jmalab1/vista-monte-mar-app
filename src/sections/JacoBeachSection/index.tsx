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
import BankDetails from '../../modules/BankDetails';
import AbbLogo from '../../modules/Logos/AbbLogo';
import SectionHeader from '../../components/heading/SectionHeader';
import CategoryCard from '../../components/Categories/CategoryCard';
import Paragraph from '../../components/ElementWrapper/Paragraph';
import Container from '../../components/Container';
import PFood from '../../assets/misc/food.jpg?w=600&webp';
import PThingsTodo from '../../assets/misc/things_to_do.jpg?w=600&webp';
import PEmergency from '../../assets/misc/emergency.jpg?w=600&webp';
import PNoteworthy from '../../assets/misc/artwork.jpg?w=600&webp';
import PGrocery from '../../assets/misc/grocery.jpg?w=600&webp';
import PBank from '../../assets/misc/atm.jpg?w=600&webp';

const categories = [
  {
    id: 'restaurants',
    img: PFood,
    icon: ChartPieIcon,
    title: 'Restaurants',
    desc: 'Looking for a bite to eat?',
    attribution: '',
    photo_link: '',
  },
  {
    id: 'things_to_do',
    img: PThingsTodo,
    icon: LightBulbIcon,
    title: 'Things To Do',
    desc: 'Explore Jaco',
    attribution: '',
    photo_link: '',
  },
  {
    id: 'emergency',
    img: PEmergency,
    icon: ChatBubbleOvalLeftEllipsisIcon,
    title: 'Emergency',
    desc: 'Need urgent help?',
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
    attribution: '',
    photo_link: '',
  },
  {
    id: 'groceries',
    img: PGrocery,
    icon: BuildingStorefrontIcon,
    title: 'Groceries',
    desc: 'Make sure to have the necessities',
    attribution: '',
    photo_link: '',
  },
  {
    id: 'banks',
    img: PBank,
    icon: CurrencyDollarIcon,
    title: 'Banks',
    desc: 'Short on cash?',
    attribution: 'Photo by @julian21',
    photo_link:
      'https://unsplash.com/@julian21?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash',
  },
];

export const JacoBeachSection = () => {
  const [hiddenDivState, setHiddenDivState] = useState('restaurants');

  const activeCategory = categories.find(({ id }) => id === hiddenDivState);
  const cardClickCallbackHandler = (id: string) => setHiddenDivState(id);

  return (
    <section className="pb-16">
      <Container classValue="gap-8 bg-[linear-gradient(180deg,rgba(255,250,244,0.96),rgba(243,248,248,0.9))] lg:px-8">
        <div className="flex flex-col gap-3">
          <p className="section-kicker text-center">Around Jaco</p>
          <SectionHeader title="Jaco Beach" centerText={true}>
            <Paragraph>
              Jaco is one of the most lively beach towns on Costa Rica&apos;s Pacific coast,
              known for sunsets, surf, food, and easy access to nature-filled day trips.
              Use these local guides to shape the kind of stay you want.
            </Paragraph>
          </SectionHeader>
        </div>

        <Card
          className="relative w-full overflow-hidden rounded-[2rem] border-0 shadow-[0_20px_60px_rgba(24,47,58,0.2)]"
          placeholder={undefined}
          onPointerEnter={undefined}
          onPointerLeave={undefined}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(78,171,182,0.65),_rgba(28,86,119,0.95))]" />
          <CardBody
            className="relative flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
            placeholder={undefined}
            onPointerEnter={undefined}
            onPointerLeave={undefined}
          >
            <div>
              <p className="section-kicker text-white/80">Book Direct</p>
              <p className="mt-3 text-2xl font-semibold text-white sm:text-3xl">Your beach days start here</p>
              <p className="mt-3 max-w-2xl text-base leading-7 text-white/80">
                Enjoy a bright condo steps from the Pacific coast, with space to unwind, dip in the pool,
                and return from adventures to something calm and comfortable.
              </p>
            </div>
            <div className="flex items-center text-white">
              <AbbLogo size={44} />
            </div>
          </CardBody>
        </Card>

        <div className="rounded-[2rem] border border-white/80 bg-[linear-gradient(180deg,rgba(255,251,246,0.94),rgba(241,247,247,0.9))] p-4 shadow-[0_18px_45px_rgba(36,61,70,0.1)] sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="section-kicker text-left">Map Categories</p>
              <p className="mt-2 text-xl font-semibold text-[#23404b]">Pick category first</p>
            </div>
            {activeCategory && (
              <span className="hidden rounded-full border border-[#d9c1ab] bg-white/80 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9b5d31] sm:inline-flex">
                {activeCategory.title}
              </span>
            )}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {categories.map((props) => (
              <CategoryCard
                key={props.id}
                {...props}
                active={hiddenDivState === props.id}
                callback={cardClickCallbackHandler}
              />
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/80 bg-[linear-gradient(180deg,rgba(255,251,246,0.94),rgba(241,247,247,0.9))] p-4 shadow-[0_18px_45px_rgba(36,61,70,0.1)] sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#dfe8e6] pb-4">
            <div>
              <p className="section-kicker text-left">Results</p>
              <p className="mt-2 text-lg font-semibold text-[#23404b]">
                {activeCategory?.title ?? 'Local places'}
              </p>
            </div>
            <p className="text-sm text-slate-600">Tap map markers or table rows for details.</p>
          </div>
          {hiddenDivState == 'restaurants' && <RestaurantDetails />}
          {hiddenDivState == 'emergency' && <EmergencyDetails />}
          {hiddenDivState == 'things_to_do' && <ThingsToDoDetails />}
          {hiddenDivState == 'noteworthy' && <NoteworthyDetails />}
          {hiddenDivState == 'groceries' && <GroceryDetails />}
          {hiddenDivState == 'banks' && <BankDetails />}
        </div>
      </Container>
    </section>
  );
};

export default JacoBeachSection;
