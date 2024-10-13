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
        </SectionHeader>
      </div>
    </section>
  );
};

export default CheckoutSection;
