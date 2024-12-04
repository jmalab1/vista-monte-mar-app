import Paragraph from '../../components/ElementWrapper/Paragraph';
import SectionHeader from '../../components/heading/SectionHeader';

export const ArrivalSection = () => {
  return (
    <section className="px-8 pb-10 bg-base-200 shadow-xl" id="house_rules">
      <div className="mb-10 grid">
        <div className="lg:ml-56 lg:mr-56">
          <SectionHeader title="Registration, Arriving and Unit Access ">
            <SectionHeader title="Before Arrival" textSize="2xl">
              <Paragraph>
                Prior to arrival, you will need to provide us with all guests' full names and passports or
                identification # so we can register you. The condo unit is in a gated secure community
                and we are required to register all guests.
              </Paragraph>
            </SectionHeader>
            <SectionHeader title="Upon Arrival" textSize="2xl">
              <Paragraph>
                At the gatehouse, upon your arrival, they will take down your plate number and ask for
                identification to verify against the registered guests. Any guests during your stay will
                also need to be registered with the gatehouse.
              </Paragraph>

              <Paragraph>
                Please let us know ahead of time of any additional guests who will need a ‘condo
                pass’ to ensure registration to easily get through the gate. This is a standard
                procedure in all condos around Jaco; the guards are wonderful and this is for you and
                the community’s safety.
              </Paragraph>
            </SectionHeader>
            <SectionHeader title="Entering/Exiting the Unit" textSize="2xl">
              <Paragraph>
                The condo unit is 2604. It is in the second tower, past the rancho-style pool area. We
                recommend parking behind the building where the main entrance is.  The unit is on
                the 6th floor, facing the mountain. As soon as you get off of the elevator, go left and
                then right to go around the wall and our unit is down the hallway.
              </Paragraph>
              <Paragraph>
                We provide each guest with a unique door entry code to access the unit for the duration
                of the stay. This is changed every reservation so you can rest assured your unit is safe and secure during your stay.
              </Paragraph>
              <Paragraph>
                To unlock, simply enter the 4-digit code provided to you. To lock, press the Schlage
                logo. From the inside, simply turn the thumb-turn to lock/unlock the door. The door
                will also automatically lock after 30 seconds.
              </Paragraph>
            </SectionHeader>
            <SectionHeader title="Wi-Fi Access" textSize="2xl">
              <Paragraph>
                We provide a complimentary access to the internet. You can connect to the Wi-Fi (VMM-Guest) by scanning the QR code
                available at the unit. You can also access using the provided password.
              </Paragraph>
            </SectionHeader>
          </SectionHeader>
        </div>
      </div>
    </section>
  );
};

export default ArrivalSection;
