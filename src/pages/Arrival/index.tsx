import ContactForm from '../../modules/ContactForm';
import ArrivalSection from '../../sections/ArrivalSection';

const Arrival = () => {
  return (
    <div className="page-shell flex flex-col gap-12 pt-6 sm:pt-8">
      <ArrivalSection />
      <ContactForm />
    </div>
  );
};

export default Arrival;
