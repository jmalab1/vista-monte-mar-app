import { Link } from 'react-router-dom';
import Paragraph from '../../components/ElementWrapper/Paragraph';
import SectionHeader from '../../components/heading/SectionHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiamondTurnRight } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@material-tailwind/react';

export const DirectionsSection = () => {
  return (
    <section className="px-8 pb-10 bg-base-200 shadow-xl" id="house_rules">
      <div className="mb-10 grid">
        <div className="lg:ml-56 lg:mr-56">
          <SectionHeader title="Directions">
            <SectionHeader
              title="Location, Airport and Travel Time"
              textSize="2xl"
            >
              <Paragraph>
                We are located in Torres del Mar Condominiums in Jaco, Costa
                Rica on the Central Pacific coast. It is roughly 1.5 hours,
                depending on traffic, from San Juan Santamaria International
                Airport (SJO).
              </Paragraph>
              <Button
                title={'Directions'}
                type={'button'}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <Link
                  to={`https://www.google.com/maps/dir/?api=1&origin=SJO&destination=Condominio+Torres+del+Mar`}
                  target="_blank"
                >
                  <span className='mr-2'>Directions</span>
                  <FontAwesomeIcon icon={faDiamondTurnRight} size="xl" />
                </Link>
              </Button>
            </SectionHeader>
            <SectionHeader title="Navigation" textSize="2xl">
              <Paragraph>
                We recommend using Waze to navigate around Costa Rica. It tends
                to be more accurate and up-to-date than Google Maps in road
                delays and routes around Costa Rica.
              </Paragraph>
            </SectionHeader>
            <SectionHeader title="Transportation" textSize="2xl">
              <Paragraph>
                You can get a taxi in the arrival area at the airport. Below are
                alternative airport transfer company/contact you could arrange
                transfer with. We would be happy to also assist in arranging
                transfer - just let us know.
              </Paragraph>
              <ul>
                <li>
                  CR Travels & Tours: + 506-6019-3784,
                  crtravelsandtour@gmail.com
                </li>
                <li>Tranfers & Tours Costa Rica: +506-8858-8333</li>
                <li>Arturo Saenz-Garcia: +506-8822-1921</li>
                <li>Rich Coast Connections - +506-8309-4521</li>
              </ul>
            </SectionHeader>
          </SectionHeader>
        </div>
      </div>
    </section>
  );
};

export default DirectionsSection;
