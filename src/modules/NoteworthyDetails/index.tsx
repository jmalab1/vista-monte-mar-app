import MapAndTable from '../MapAndTable';
import noteworthy from './noteworthy.json';
import details from './details.json';

export const NoteworthyDetails = () => {
  return (
    <MapAndTable
      records={noteworthy.features}
      title="Noteworthy"
      details={details}
    />
  );
};

export default NoteworthyDetails;
