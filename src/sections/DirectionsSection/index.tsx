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
              horizontalLine={true}
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
                  <FontAwesomeIcon
                    icon={faDiamondTurnRight}
                    size="xl"
                    className="mr-2"
                  />
                  <span>Directions</span>
                </Link>
              </Button>
            </SectionHeader>
            <SectionHeader
              title="Navigation"
              textSize="2xl"
              horizontalLine={true}
            >
              <Paragraph>
                We recommend using Waze to navigate around Costa Rica. It tends
                to be more accurate and up-to-date than Google Maps in road
                delays and routes around Costa Rica. Enjoy the scenic ride.
              </Paragraph>
            </SectionHeader>
            <SectionHeader
              title="Transportation"
              textSize="2xl"
              horizontalLine={true}
            >
              <Paragraph>
                At the airport, you can get a taxi in the arrival area. Below
                are alternative airport transfer companies/contacts you could
                arrange a transfer with. We would be happy to also assist in
                arranging the transfer - just let us know.
              </Paragraph>
              <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                  <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              className="px-3 py-3 text-start text-xs font-medium text-nuetral uppercase"
                            >
                              Company Name
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3 text-start text-xs font-medium text-nuetral uppercase"
                            >
                              Contact Info
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          <tr>
                            <td className="px-6 py-4 text-sm font-medium text-nuetral">
                              CR Travels & Tours
                            </td>
                            <td className="px-6 py-4 text-sm text-nuetral">
                              <a href="tel:506-6019-3784">+506-6019-3784</a>,{' '}
                              <a href="mailto:crtravelsandtour@gmail.com">
                                crtravelsandtour@gmail.com
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 text-sm font-medium text-nuetral">
                              Tranfers & Tours Costa Rica
                            </td>
                            <td className="px-6 py-4 text-sm text-nuetral">
                              <a href="tel:506-8858-8333">+506-8858-8333</a>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 text-sm font-medium text-nuetral">
                              Arturo Saenz-Garcia
                            </td>
                            <td className="px-6 py-4 text-sm text-nuetral">
                              <a href="tel:506-8822-1921">+506-8822-1921</a>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 text-sm font-medium text-nuetral">
                              Rich Coast Connections
                            </td>
                            <td className="px-6 py-4 text-sm text-nuetral">
                              <a href="tel:506-8309-4521">+506-8309-4521</a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </SectionHeader>
          </SectionHeader>
        </div>
      </div>
    </section>
  );
};

export default DirectionsSection;
