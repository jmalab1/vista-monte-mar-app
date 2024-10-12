import MapAndTable from '../MapAndTable';
import thingstodo from './thingstodo.json';

export const ThingsToDoDetails = () => {
  return <MapAndTable records={thingstodo.features} title="Things To Do" />;
};

export default ThingsToDoDetails;
