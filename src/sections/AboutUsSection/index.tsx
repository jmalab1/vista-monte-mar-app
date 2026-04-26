import Container from '../../components/Container';
import SectionHeader from '../../components/heading/SectionHeader';
import about from './about_us.json';

export const AboutUsSection = () => {
  return (
    <Container classValue="bg-base-200">
      <SectionHeader
        title="About Us and Our Home"
        classValue="mx-auto w-full max-w-5xl px-2 lg:px-8"
      >
        {about.map((a, index) => (
          <p
            key={`about-${index}`}
            className={`mt-7 text-lg leading-8 ${
              a.font === 'Pacifico' ? 'font-pacifico text-2xl' : ''
            }`}
          >
            {a.text}
          </p>
        ))}
      </SectionHeader>
    </Container>
  );
};

export default AboutUsSection;
