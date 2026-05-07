import ContactForm from '../../modules/ContactForm';
import AboutUsSection from '../../sections/AboutUsSection';

const AboutUs = () => {
  return (
    <div className="page-shell flex flex-col gap-12 pt-6 sm:pt-8">
      <AboutUsSection />
      <ContactForm />
    </div>
  );
};

export default AboutUs;
