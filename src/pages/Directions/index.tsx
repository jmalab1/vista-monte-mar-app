import ContactForm from '../../modules/ContactForm';
import DirectionsSection from '../../sections/DirectionsSection';

const Directions = () => {
  return (
    <div className="page-shell flex flex-col gap-12 pt-6 sm:pt-8">
      <DirectionsSection />
      <ContactForm />
    </div>
  );
};

export default Directions;
