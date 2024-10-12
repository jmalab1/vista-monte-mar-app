import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  FeatureGroup,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-providers';
import { FunctionComponent, useEffect, useRef } from 'react';
import L, { Bounds, LatLngExpression } from 'leaflet';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.css';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.js';
import 'font-awesome/css/font-awesome.min.css';

type TMapboxMap = {
  coordinates: number[];
  name: string;
};

const locate = L.AwesomeMarkers.icon({
  icon: 'location-arrow',
  markerColor: 'blue',
  prefix: 'fa',
});

const home = L.AwesomeMarkers.icon({
  icon: 'home',
  markerColor: 'black',
  prefix: 'fa',
});

const reverseCoordinates = (coordinates: number[]): LatLngExpression => {
  return [coordinates[1], coordinates[0]]; // [longitude, latitude]
};

const MapboxMap: FunctionComponent<TMapboxMap> = ({ coordinates, name }) => {
  const latLon = reverseCoordinates(coordinates);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    // Reset the map view when the location prop changes
    if (mapRef.current) {
      mapRef.current.setView(latLon, 14);
    }
  }, [latLon]);

  return (
    <div className="rounded-lg shadow-lg relative mb-5 z-0">
      <MapContainer
        center={latLon}
        zoom={14}
        ref={mapRef}
        style={{ height: '26rem', width: '100%' }}
      >
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <FeatureGroup>
          <Marker position={latLon} icon={locate}>
            <Popup>{name}</Popup>
          </Marker>
          <Marker position={[9.6061, -84.62073]} icon={home}>
            <Popup>Vista Monte Mar</Popup>
          </Marker>
        </FeatureGroup>
      </MapContainer>
    </div>
  );
};

export default MapboxMap;
