import SectionHeader from '../../components/heading/SectionHeader';
import about from './about_us.json';

export const AboutUsSection = () => {
  return (
    <section className="px-8 pb-10 bg-base-200 shadow-xl" id="house_rules">
      <div className="mb-10 grid lg:ml-56 lg:mr-56">
        <SectionHeader title="About Us and Our Home">
          {about.map((a) => (
            <p className={`text-md mt-5 font-[${a.font}]`}>{a.text}</p>
          ))}
        </SectionHeader>
      </div>
    </section>
  );
};

export default AboutUsSection;
