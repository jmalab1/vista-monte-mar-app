import MapAndTable from '../MapAndTable';
import restaurants from './restaurants.json';
import details from './details.json';
import _ from 'lodash';

export const RestaurantDetails = () => {
  return (
    <MapAndTable
      records={restaurants.features}
      title="Restaurants"
      details={details}
    />
  );
};

export default RestaurantDetails;
