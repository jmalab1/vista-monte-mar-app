import MapAndTable from '../MapAndTable';
import thingstodo from './thingstodo.json';
import details from './details.json';

export const ThingsToDoDetails = () => {
  return (
    <MapAndTable
      records={thingstodo.features}
      title="Things To Do"
      details={details}
    />
  );
};

export default ThingsToDoDetails;
