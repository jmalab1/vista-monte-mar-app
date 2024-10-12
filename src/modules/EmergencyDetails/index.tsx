import MapAndTable from '../MapAndTable';
import emergency from './emergency.json';
import details from './details.json';

export const EmergencyDetails = () => {
  return (
    <MapAndTable
      records={emergency.features}
      title="Emergency"
      details={details}
    />
  );
};

export default EmergencyDetails;
