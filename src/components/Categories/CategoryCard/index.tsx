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
      as="button"
      type="button"
      className={`group relative w-full overflow-hidden rounded-[1.5rem] border text-left transition duration-300 ${
        active
          ? 'border-[#d8a47b] bg-[linear-gradient(135deg,rgba(214,165,125,0.16),rgba(38,78,92,0.12))] shadow-[0_16px_32px_rgba(36,61,70,0.12)]'
          : 'border-white/70 bg-white/78 shadow-[0_12px_28px_rgba(36,61,70,0.08)] hover:-translate-y-0.5 hover:border-[#d8a47b]/60 hover:shadow-[0_16px_32px_rgba(36,61,70,0.14)]'
      }`}
      placeholder={undefined}
      onPointerEnter={undefined}
      onPointerLeave={undefined}
      onClick={() => callback(id)}
    >
      <div className="absolute inset-0 overflow-hidden rounded-[1.5rem]">
        <img
          src={img}
          alt={title}
          className={`h-full w-full object-cover object-center transition duration-300 ${
            active ? 'scale-105 opacity-80' : 'opacity-45 group-hover:opacity-60'
          }`}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,251,246,0.97)_0%,rgba(255,251,246,0.9)_46%,rgba(255,251,246,0.6)_72%,rgba(255,251,246,0.22)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left_center,rgba(255,251,246,0.34),transparent_60%)]" />
      </div>
      <CardBody
        className="relative flex min-h-[6rem] flex-col justify-between p-3 sm:min-h-[6.5rem] sm:p-4"
        placeholder={undefined}
        onPointerEnter={undefined}
        onPointerLeave={undefined}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-1 items-start gap-3">
            <span
              className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border ${
                active
                  ? 'border-[#d8a47b]/60 bg-[#d8a47b]/20 text-[#9b5d31]'
                  : 'border-[#dfe8e6] bg-white/85 text-[#2b5360]'
              }`}
            >
              <Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <Typography
                variant="h5"
                className="mt-1 text-[1rem] leading-6 text-[#23404b] sm:text-[1.08rem]"
                placeholder={undefined}
                onPointerEnter={undefined}
                onPointerLeave={undefined}
              >
                {title}
              </Typography>
            </div>
          </div>
          {active ? (
            <span className="mt-1 inline-flex shrink-0 items-center justify-center rounded-full border border-[#d8a47b]/70 bg-white/85 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9b5d31]">
              Viewing
            </span>
          ) : null}
        </div>
        <Typography
          className="mt-3 max-w-[14rem] text-sm leading-5 text-slate-600 sm:max-w-[15rem] sm:text-[0.95rem]"
          placeholder={undefined}
          onPointerEnter={undefined}
          onPointerLeave={undefined}
        >
          {desc}
        </Typography>
      </CardBody>
      {attribution && photo_link && (
        <div className="absolute bottom-2 right-2 max-w-[6.25rem] rounded-full bg-white/88 px-2 py-1 text-center text-[7px] leading-tight text-slate-700 backdrop-blur sm:text-[8px]">
          <Link to={photo_link} target="_blank">
            {attribution}
          </Link>
        </div>
      )}
    </Card>
  );
};

export default CategoryCard;
