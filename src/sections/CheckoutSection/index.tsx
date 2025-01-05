import Paragraph from '../../components/ElementWrapper/Paragraph';
import SectionHeader from '../../components/heading/SectionHeader';
import instructions from './instructions.json';

export const CheckoutSection = () => {
  return (
    <section className="px-8 pb-10 bg-base-200 shadow-xl" id="house_rules">
      <div className="mb-10 grid">
        <SectionHeader title="Check-out Instructions">
          <div className="lg:mb-12 pt-8 space-y-6">
            {instructions.map((instruction) => (
              <div
                className="bg-base-100 border-t border-b border-secondary px-4 py-3"
                role="alert"
              >
                <p className="text-sm text-nuetral">
                  {instruction.description}
                </p>
              </div>
            ))}
          </div>
          <Paragraph>
            Please leave us a review on Airbnb. We hope you had a great
            experience at Vista Monte Mar and look forward to hosting you again
            soon. We strive to provide the best experience to our guests so if
            there is anything we can do better to make your stay more
            comfortable, please give us a chance and communicate directly with
            us right away.
          </Paragraph>
        </SectionHeader>
      </div>
    </section>
  );
};

export default CheckoutSection;
