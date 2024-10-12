import MapAndTable from '../MapAndTable';
import noteworthy from './noteworthy.json';

export const NoteworthyDetails = () => {
  return <MapAndTable records={noteworthy.features} title="Further Away" />;
};

export default NoteworthyDetails;
