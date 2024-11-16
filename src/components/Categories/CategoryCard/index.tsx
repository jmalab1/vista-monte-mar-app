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
  attribution: string;
  photo_link: string;
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
      className={`relative grid lg:min-h-[12rem] w-full overflow-hidden ${active ? 'grayscale' : 'hover:cursor-pointer transition-transform duration-300 transform hover:scale-105'}`}
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      onClick={() => callback(id)}
    >
      <img
        src={img}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 h-full w-full bg-black/50" />
      <CardBody
        className="relative flex flex-col justify-between"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Icon className="h-8 w-8 text-white hidden lg:block" />
        <div>
          <Typography
            variant="h5"
            className="mb-1"
            color="white"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {title}
          </Typography>
          <Typography
            color="white"
            className="text-xs font-bold opacity-50 hidden lg:block"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {desc}
          </Typography>
        </div>
      </CardBody>
      <div className="text-[6pt] absolute bottom-0 right-0 bg-white bg-opacity-60 pl-2 pr-2">
        <Link to={photo_link} target="_blank">
          {attribution}
        </Link>
      </div>
    </Card>
  );
};
export default CategoryCard;
