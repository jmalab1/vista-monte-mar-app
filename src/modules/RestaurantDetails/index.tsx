import MapAndTable from '../MapAndTable';
import restaurants from './restaurants.json';

export const RestaurantDetails = () => {
  return <MapAndTable records={restaurants.features} title="Restaurants" />;
};

export default RestaurantDetails;
