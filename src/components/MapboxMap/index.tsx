import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  FeatureGroup,
  useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-providers';
import { FunctionComponent, useEffect, useRef } from 'react';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.css';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.js';
import 'font-awesome/css/font-awesome.min.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

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

// Component to set up routing control
const RoutingControl = ({ start, end, name }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],
      routeWhileDragging: true,
      createMarker: function (
        i: number,
        waypoint: { latLng: L.LatLngExpression }
      ) {
        // Create markers with custom icons and popups
        const marker = L.marker(waypoint.latLng, {
          icon: i === 0 ? home : locate, // Use start icon for start and end icon for end
        });

        // Add popup content based on the marker
        if (i === 0) {
          marker.bindPopup(
            '<b>Vista Monte Mar</b>'
          );
        } else if (i === 1) {
          marker.bindPopup(
            `<b>${name}</b>`
          );
        }

        return marker;
      },
    }).addTo(map);

    // Cleanup on component unmount
    return () => {
      map.removeControl(routingControl);
    };
  }, [map, start, end]);

  return null;
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
        <RoutingControl start={[9.6061, -84.62073]} end={latLon} name={name} />
      </MapContainer>
    </div>
  );
};

export default MapboxMap;
