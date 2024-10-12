import { FunctionComponent, useState } from 'react';
import MapboxMap from '../../components/MapboxMap';
import MiniCardHolder from '../../components/MiniCards/MiniCardHolder';
import MiniCard from '../../components/MiniCards/MiniCard';
import _ from 'lodash';

export type Tfeature = {
  type: string;
  properties: properties;
  geometry: geometry;
};

type properties = {
  name: string;
  styleUrl: string;
  styleHash: string;
  icon: string;
};

type geometry = {
  type: string;
  coordinates: number[];
};

type TMapAndTable = {
  records: Tfeature[];
  title: string;
};

export const MapAndTable: FunctionComponent<TMapAndTable> = ({
  records,
  title,
}) => {
  const [coordinates, setCoordinates] = useState<number[]>([-84.62073, 9.6061]);
  const [active, setActive] = useState('');

  const onClickMiniCard = (record: Tfeature) => {
    setCoordinates(record.geometry.coordinates);
    setActive(record.properties.name);
  };

  return (
    <div className="md:grid md:grid-cols-1 md:grid-cols-3 md:gap-6 mt-10">
      <MiniCardHolder title={title}>
        {records.map((record) => {
          if (record.properties.name == 'Vista Monte Mar - TDM') {
            return;
          }

          return (
            <MiniCard
              record={record}
              callback={onClickMiniCard}
              active={active}
            />
          );
        })}
      </MiniCardHolder>
      <div className="col-span-2">
        <MapboxMap coordinates={coordinates} name={active} />
      </div>
    </div>
  );
};

export default MapAndTable;
