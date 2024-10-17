import Paragraph from '../../components/ElementWrapper/Paragraph';
import SectionHeader from '../../components/heading/SectionHeader';

export const ArrivalSection = () => {
  return (
    <section className="px-8 pb-10 bg-base-200 shadow-xl" id="house_rules">
      <div className="mb-10 grid">
        <div className="lg:ml-56 lg:mr-56">
          <SectionHeader title="Before Arrival">
            <Paragraph>
              Prior to arrival, you will need to provide us with all guests full
              name and passport or identification # so we can register you. The
              condo unit in a gated secure community and we are required to
              register all guests.
            </Paragraph>
          </SectionHeader>
          <SectionHeader title="Navigation">
            <Paragraph>
              At the gate house, upon your arrival, they will take down your
              plate number and ask for identification to verify against the
              registered guests. Any guests during your stay will also need to
              be registered with the gate house.
            </Paragraph>

            <Paragraph>
              Please let us know ahead of time of any additional guests that
              will need a 'condo pass' to ensure registration to easily get
              through the gate. This is a standard procedure in all condos
              around Jaco; the guards are wonderful and this is for you and the
              community's safety.{' '}
            </Paragraph>
          </SectionHeader>
          <SectionHeader title="Entering/Exiting the Unit">
            <Paragraph>
              We provide each guest with a unique keyless entry code to access
              the unit for the duration of the stay. This is changed every
              reservation so you can rest assured yoiur unit is safe and secure.
            </Paragraph>

            <Paragraph>
              To unlock, enter the 4 digit code provided to you and press the
              check button. To lock, press the padlock button. From the inside,
              simply turn the dial to lock the door. The door will also
              automatically lock after a minute.
            </Paragraph>
          </SectionHeader>
        </div>
      </div>
    </section>
  );
};

export default ArrivalSection;
