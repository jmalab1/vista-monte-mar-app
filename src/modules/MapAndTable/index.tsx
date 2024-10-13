import { FunctionComponent, useState } from 'react';
import MapboxMap from '../../components/MapboxMap';
import MiniCardHolder from '../../components/MiniCards/MiniCardHolder';
import MiniCard from '../../components/MiniCards/MiniCard';
import _ from 'lodash';

export type Tfeature = {
  type: string;
  properties: properties;
  geometry: geometry;
  details?: any;
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
  details: any;
};

export const MapAndTable: FunctionComponent<TMapAndTable> = ({
  records,
  title,
  details,
}) => {
  const [coordinates, setCoordinates] = useState<number[]>(
    records[0].geometry.coordinates
  );
  const [active, setActive] = useState(records[0].properties.name);

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
              detail={_.find(details, { name: record.properties.name })}
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
