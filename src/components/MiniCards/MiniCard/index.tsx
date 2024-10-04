import { FunctionComponent } from 'react';
import { TSmallTableRecord } from '../../SmallTable';

type TMiniCard = {
  record: TSmallTableRecord;
  callback: (arg0: TSmallTableRecord) => void;
  active?: string;
};

const MiniCard: FunctionComponent<TMiniCard> = ({ record, callback, active }) => {
  return (
    <div
      className={`font-[Helvetica] grid grid-cols-6 items-start rounded-xl bg-base-200 cursor-pointer shadow-inner-lg ${record.name == active ? 'bg-info' : 'hover:bg-base-300'}`}
      onClick={() => callback(record)}
    >
      <div className="col-span-5">
        <div className='p-2'>
          <p className="font-bold text-xs text-nuetral">
            {record.name}{' '}
            <span className="mt-2 content-center">({record.type})</span>
          </p>
          <p className="mt-2 text-xs">{record.description}</p>

        </div>
      </div>
      <div className='border-l-[1px] border-dashed h-full w-full place-content-center pl-2'>
        <span className="text-xs">{record.distance}</span>
      </div>
    </div>
  );
};

export default MiniCard;
