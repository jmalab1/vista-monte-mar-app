import MapAndTable from '../MapAndTable';
import bank from './bank.json';
import details from './details.json';

export const BankDetails = () => {
  return (
    <MapAndTable
      records={bank.features}
      title="Banks"
      details={details}
    />
  );
};

export default BankDetails;
