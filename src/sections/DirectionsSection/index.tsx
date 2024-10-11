import SectionHeader from '../../components/heading/SectionHeader';

export const DirectionsSection = () => {
  return (
    <section className="px-8 pb-10 bg-base-200 shadow-xl" id="house_rules">
      <div className="mb-10 grid">
        <div className="lg:ml-56 lg:mr-56">
          <SectionHeader title="Location, Airport and Travel Time">
            We are located in Torres del Mar Condominiums in Jaco, Costa Rica on the Central Pacific coast.
            It is roughly 1.5 hours, depending on traffic, from San Juan Santamaria International Airport (SJO).
          </SectionHeader>
          <SectionHeader title="Navigation">
            We recommend using Waze to navigate around Costa Rica.
            It tends to be more accurate and up-to-date than Google map in road delays and routes around Costa Rica .
          </SectionHeader>
          <SectionHeader title="Transportation">
            At the airport you can get a taxi in the arrival area. Below are alternative airport
            transfer company/contact you could arrange transfer with. We would be happy to
            also assist in arranging transfer - just let us know.
          </SectionHeader>
        </div>
      </div>
    </section>
  );
};

export default DirectionsSection;
