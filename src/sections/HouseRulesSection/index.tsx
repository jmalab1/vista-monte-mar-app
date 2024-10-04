import SectionHeader from '../../components/heading/SectionHeader';
import rules from './house_rules.json'
import _ from 'lodash';

export const HouseRulesSection = () => {
  return (
    <section className="px-8 pb-20 pt-20 lg:pt-0 bg-base-200 shadow-xl" id="house_rules">
      <div className="mb-10 grid place-items-center text-center">
        <SectionHeader
          title="House Rules"
        >
          {rules.map((rule) => (
            <div className="collapse bg-base-200">
              <input type="radio" name="my-accordion-1" defaultChecked />
              <div className="collapse-title text-xl font-medium justify">{rule.title}</div>
              <div className="">
                <p>{rule.description}</p>
              </div>
            </div>
          ))}
        </SectionHeader>
      </div>
    </section>
  );
};

export default HouseRulesSection;
