import { FunctionComponent } from 'react';
import { Tfeature } from '../../../modules/MapAndTable';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiamondTurnRight } from '@fortawesome/free-solid-svg-icons';

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
      className={`font-[Helvetica] grid grid-cols-12 rounded-xl bg-base-200 cursor-pointer shadow-inner-lg ${record.properties.name == active ? 'border-secondary border border-2 border-dashed' : 'hover:bg-base-300'}`}
      onClick={() => callback(record)}
    >
      <div className="col-span-10 p-2">
        <p className="font-bold text-xs text-nuetral">
          {record.properties.name}
          {detail.type && <> ({detail.type})</>}
        </p>
        <p className="mt-2 text-xs">{detail.description}</p>
      </div>
      {detail.distance_km && (
        <div className="border-l-[1px] border-dashed place-content-center pl-2">
          <span className="text-xs text-nuetral whitespace-nowrap block">
            {detail.distance_km} km
          </span>
          <Link
            to={`https://www.google.com/maps/dir/?api=1&origin=Condominio+Torres+del+Mar&destination=${record.properties.name}+jaco+${detail.type}`}
            target="_blank"
          >
            <FontAwesomeIcon icon={faDiamondTurnRight} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default MiniCard;
