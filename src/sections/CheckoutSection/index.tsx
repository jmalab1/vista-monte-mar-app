import {
  ChatBubbleBottomCenterTextIcon,
  CheckBadgeIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import Container from '../../components/Container';
import SectionHeader from '../../components/heading/SectionHeader';
import instructions from './instructions.json';

export const CheckoutSection = () => {
  return (
    <Container classValue="bg-base-200">
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="rounded-[1.9rem] border border-white/75 bg-[linear-gradient(180deg,#fffaf3,#f5efe6)] p-6 shadow-[0_18px_50px_rgba(34,56,69,0.08)] sm:p-8">
          <p className="section-kicker">Departure Checklist</p>
          <h2 className="mt-4 font-pacifico text-4xl text-[#d48a58] sm:text-5xl">Check-out</h2>
          <p className="mt-6 max-w-md text-base leading-7 text-slate-600">
            A short reset before you head out helps the condo turn over smoothly and keeps
            everything ready for the next guest.
          </p>

          <div className="mt-8 space-y-4">
            <div className="rounded-[1.35rem] border border-[#eddcc8] bg-white/85 p-4">
              <div className="flex items-start gap-3">
                <ClockIcon className="mt-0.5 h-5 w-5 text-[#d48a58]" />
                <div>
                  <p className="font-semibold text-slate-700">Check-out by 11 AM</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Let us know if you need to request a little extra time.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-[1.35rem] border border-[#eddcc8] bg-white/85 p-4">
              <div className="flex items-start gap-3">
                <CheckBadgeIcon className="mt-0.5 h-5 w-5 text-[#d48a58]" />
                <div>
                  <p className="font-semibold text-slate-700">Focus on the essentials</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    You do not need to deep clean, just cover the key guest handoff steps below.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-[1.35rem] border border-[#eddcc8] bg-white/85 p-4">
              <div className="flex items-start gap-3">
                <ChatBubbleBottomCenterTextIcon className="mt-0.5 h-5 w-5 text-[#d48a58]" />
                <div>
                  <p className="font-semibold text-slate-700">Tell us about any issues</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    If something broke or felt off during your stay, a quick message really helps.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[1.9rem] border border-white/80 bg-white/75 p-6 shadow-[0_18px_46px_rgba(34,56,69,0.08)] sm:p-8">
          <SectionHeader
            title="Before You Go"
            classValue="w-full"
            contentClassValue="mt-6"
          >
            <div className="space-y-4">
              {instructions.map((instruction, index) => (
                <div
                  key={instruction.description}
                  className="rounded-[1.35rem] border border-[#ebddd1] bg-[#fffaf4] p-5 transition duration-300 hover:border-[#ddb48e] hover:shadow-md"
                  role="alert"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f3e2cf] text-sm font-semibold text-[#9b6135]">
                      {index + 1}
                    </div>
                    <p className="min-w-0 text-sm leading-7 text-slate-600">{instruction.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[1.35rem] border border-dashed border-[#e2c6ad] bg-[#fff7ef] p-5">
              <p className="text-sm leading-7 text-slate-600">
                Please leave us a review on Airbnb. We hope you had a great experience at Vista
                Monte Mar and would love the chance to host you again.
              </p>
            </div>
          </SectionHeader>
        </div>
      </div>
    </Container>
  );
};

export default CheckoutSection;
