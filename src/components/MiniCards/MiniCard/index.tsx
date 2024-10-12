import { FunctionComponent } from 'react';
import { Tfeature } from '../../../modules/MapAndTable';

type TMiniCard = {
  record: Tfeature;
  callback: (arg0: Tfeature) => void;
  active?: string;
  detail?: any;
};

const MiniCard: FunctionComponent<TMiniCard> = ({
  record,
  callback,
  active,
  detail,
}) => {
  return (
    <div
      className={`font-[Helvetica] grid grid-cols-6 rounded-xl bg-base-200 cursor-pointer shadow-inner-lg ${record.properties.name == active ? 'border-secondary border border-2 border-dashed' : 'hover:bg-base-300'}`}
      onClick={() => callback(record)}
    >
      <div className="col-span-5 p-2">
        <p className="font-bold text-xs text-nuetral">
          {record.properties.name}
          {detail.type && <> ({detail.type})</>}
        </p>
        <p className="mt-2 text-xs">{detail.description}</p>
      </div>
      {detail.distance_km && (
        <div className="border-l-[1px] border-dashed place-content-center pl-2">
          <span className="text-xs text-nuetral">{detail.distance_km} km</span>
        </div>
      )}
    </div>
  );
};

export default MiniCard;
