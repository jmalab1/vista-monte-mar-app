import SectionHeader from '../../components/heading/SectionHeader';
import rules from './house_rules.json';
import _ from 'lodash';

export const HouseRulesSection = () => {
  return (
    <section className="px-8 pb-10 pt-0 bg-base-200 shadow-xl" id="house_rules">
      <div className="mb-10 grid">
        <SectionHeader title="House Rules">
          <div className="lg:mb-12 pt-8 space-y-6">
            {rules.map((rule) => (
              <div
                className="bg-base-100 border-t border-b border-secondary px-4 py-3"
                role="alert"
              >
                <p className="font-bold text-nuetral">{rule.title}</p>
                <p className="text-sm text-nuetral">{rule.description}</p>
              </div>
            ))}
          </div>
        </SectionHeader>
      </div>
    </section>
  );
};

export default HouseRulesSection;
