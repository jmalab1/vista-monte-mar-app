import MapAndTable from '../MapAndTable';
import grocery from './grocery.json';
import details from './details.json';

export const GroceryDetails = () => {
  return (
    <MapAndTable
      records={grocery.features}
      title="Grocery"
      details={details}
    />
  );
};

export default GroceryDetails;
