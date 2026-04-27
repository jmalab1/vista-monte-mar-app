import React from 'react';
import { Card, CardBody, Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  id: string;
  img: string;
  title: string;
  desc: string;
  icon: React.ElementType;
  callback: (id: string) => void;
  active: boolean;
  attribution?: string;
  photo_link?: string;
}

const CategoryCard = ({
  id,
  img,
  title,
  desc,
  icon: Icon,
  active,
  callback,
  attribution,
  photo_link,
}: CategoryCardProps) => {
  return (
    <Card
      className={`relative grid min-h-[7rem] w-full overflow-hidden rounded-[1.25rem] border-0 shadow-md transition duration-300 sm:min-h-[8.5rem] sm:rounded-[1.5rem] ${
        active
          ? 'scale-[0.98] ring-2 ring-[#d8a47b]'
          : 'hover:cursor-pointer hover:scale-[1.02] hover:shadow-xl'
      }`}
      placeholder={undefined}
      onPointerEnter={undefined}
      onPointerLeave={undefined}
      onClick={() => callback(id)}
    >
      <img
        src={img}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className={`absolute inset-0 h-full w-full ${active ? 'bg-[#204b5a]/50' : 'bg-black/45'}`} />
      <CardBody
        className="relative flex h-full flex-col justify-between p-3 sm:p-4 lg:p-5"
        placeholder={undefined}
        onPointerEnter={undefined}
        onPointerLeave={undefined}
      >
        <div className="flex items-start justify-between gap-3">
          <Icon className="hidden h-7 w-7 text-white lg:block" />
          {active && (
            <span className="rounded-full border border-white/60 bg-white/20 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-white sm:px-3 sm:text-[11px]">
              Viewing
            </span>
          )}
        </div>
        <div>
          <Typography
            variant="h5"
            className="mb-1 text-base sm:text-lg lg:text-xl"
            color="white"
            placeholder={undefined}
            onPointerEnter={undefined}
            onPointerLeave={undefined}
          >
            {title}
          </Typography>
          <Typography
            color="white"
            className="hidden text-sm font-medium leading-6 text-white/75 lg:block"
            placeholder={undefined}
            onPointerEnter={undefined}
            onPointerLeave={undefined}
          >
            {desc}
          </Typography>
        </div>
      </CardBody>
      {attribution && photo_link && (
        <div className="absolute bottom-2 right-2 rounded-full bg-white/70 px-2 py-1 text-[8px] text-slate-700 backdrop-blur sm:text-[9px]">
          <Link to={photo_link} target="_blank">
            {attribution}
          </Link>
        </div>
      )}
    </Card>
  );
};

export default CategoryCard;
