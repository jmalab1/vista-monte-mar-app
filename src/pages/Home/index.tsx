import ContactForm from '../../modules/ContactForm';
import Hero from '../../modules/Hero';
import JacoBeachSection from '../../sections/JacoBeachSection';
import TestimonialsSection from '../../sections/TestimonialsSection';

const Home = () => {
  return (
    <div className="page-shell flex flex-col gap-12">
      <Hero />
      <JacoBeachSection />
      <TestimonialsSection />
      <ContactForm />
    </div>
  );
};

export default Home;
