import ContactForm from '../../modules/ContactForm';
import HouseRulesSection from '../../sections/HouseRulesSection';

const HouseRules = () => {
  return (
    <div className="page-shell flex flex-col gap-12 pt-6 sm:pt-8">
      <HouseRulesSection />
      <ContactForm />
    </div>
  );
};

export default HouseRules;
