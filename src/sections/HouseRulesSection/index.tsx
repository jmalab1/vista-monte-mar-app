import {
  HomeModernIcon,
  MoonIcon,
  NoSymbolIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import Container from '../../components/Container';
import SectionHeader from '../../components/heading/SectionHeader';
import rules from './house_rules.json';

const highlights = [
  {
    title: 'Protect the space',
    text: 'Treat the condo like a home you plan to come back to.',
    icon: HomeModernIcon,
  },
  {
    title: 'Keep things calm',
    text: 'Quiet, registered stays help keep the community comfortable for everyone.',
    icon: MoonIcon,
  },
  {
    title: 'Avoid penalties',
    text: 'Smoking, parties, and serious damage can lead to extra charges.',
    icon: NoSymbolIcon,
  },
];

export const HouseRulesSection = () => {
  return (
    <Container classValue="bg-base-200">
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[1.9rem] bg-[linear-gradient(180deg,#274a56,#1f3c47)] p-6 text-white shadow-[0_24px_60px_rgba(24,49,58,0.22)] sm:p-8">
          <p className="section-kicker text-white/70">Good To Know</p>
          <h2 className="mt-4 font-pacifico text-4xl text-[#ffd7b2] sm:text-5xl">House Rules</h2>
          <p className="mt-6 max-w-md text-base leading-7 text-white/78">
            A few simple guidelines help keep the condo comfortable for you, respectful of the
            neighbors, and ready for the next guest.
          </p>
          <div className="mt-8 space-y-4">
            {highlights.map(({ title, text, icon: Icon }) => (
              <div
                key={title}
                className="rounded-[1.4rem] border border-white/10 bg-white/10 p-4 backdrop-blur-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl bg-white/12 p-2">
                    <Icon className="h-5 w-5 text-[#ffd7b2]" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{title}</p>
                    <p className="mt-1 text-sm leading-6 text-white/70">{text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.9rem] border border-white/80 bg-white/72 p-6 shadow-[0_18px_46px_rgba(34,56,69,0.08)] sm:p-8">
          <SectionHeader
            title="Stay Guidelines"
            classValue="w-full"
            contentClassValue="mt-6"
          >
            <div className="space-y-4">
              {rules.map((rule, index) => (
                <div
                  key={rule.title}
                  className="rounded-[1.35rem] border border-[#ebddd1] bg-[#fffaf4] p-5 transition duration-300 hover:border-[#ddb48e] hover:shadow-md"
                  role="alert"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f3e2cf] text-sm font-semibold text-[#9b6135]">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-slate-700">{rule.title}</p>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{rule.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-[1.35rem] border border-dashed border-[#e2c6ad] bg-[#fff7ef] p-5">
              <div className="flex items-start gap-3">
                <SparklesIcon className="mt-0.5 h-5 w-5 text-[#d48a58]" />
                <p className="text-sm leading-7 text-slate-600">
                  If you need an exception, like an early check-in or late check-out, just ask.
                  We&apos;re happy to help when we can.
                </p>
              </div>
            </div>
          </SectionHeader>
        </div>
      </div>
    </Container>
  );
};

export default HouseRulesSection;
