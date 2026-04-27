import ContactForm from '../../modules/ContactForm';
import Hero from '../../modules/Hero';
import JacoBeachSection from '../../sections/JacoBeachSection';

const Home = () => {
  return (
    <div className="page-shell flex flex-col gap-12">
      <Hero />
      <JacoBeachSection />
      <ContactForm />
    </div>
  );
};

export default Home;
