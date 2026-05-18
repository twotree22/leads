import LeadForm from "./LeadForm";

const phoneDisplay = "1-850-977-9719";
const phoneHref = "tel:18509779719";

const benefits = [
  {
    title: "Help Protect Loved Ones",
    description:
      "Explore coverage options designed to help reduce the financial burden of funeral, burial, and final expenses.",
  },
  {
    title: "Affordable Monthly Options",
    description:
      "Talk through budget-conscious choices with an agent who can explain available options in clear terms.",
  },
  {
    title: "Simple Phone Consultation",
    description:
      "Get helpful answers by phone without complicated forms or a long online process.",
  },
];

const trustPoints = [
  "Licensed agents",
  "Clear coverage options",
  "No pressure consultation",
  "Fast phone support",
];

const topTrustPoints = [
  "Licensed agent support",
  "Simple phone consultation",
  "No obligation to enroll",
  "Coverage varies by state",
];

const steps = [
  {
    label: "Step 1",
    title: "Call Today",
    description:
      "Tap the call button and connect with support during available phone hours.",
  },
  {
    label: "Step 2",
    title: "Speak With a Licensed Agent",
    description:
      "Share your needs and questions with someone who can explain final expense coverage options.",
  },
  {
    label: "Step 3",
    title: "Review Available Options",
    description:
      "Compare choices that may fit your goals, budget, and family priorities.",
  },
];

const faqItems = [
  {
    question: "What is final expense coverage?",
    answer:
      "Final expense life insurance is commonly used to help with funeral, burial, medical, or other end-of-life costs. A licensed agent can explain available options.",
  },
  {
    question: "Do I have to buy anything when I call?",
    answer:
      "No. The call is a simple consultation so you can understand options and decide what makes sense for your situation.",
  },
  {
    question: "Why do you ask for state and age?",
    answer:
      "Availability and options can vary by state and age. These details help an agent provide a more relevant conversation.",
  },
  {
    question: "Is coverage guaranteed?",
    answer:
      "Coverage is not guaranteed by this page. Eligibility, benefits, and pricing depend on the option reviewed and applicable requirements.",
  },
];

function CallButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={phoneHref}
      className={`inline-flex min-h-16 w-full items-center justify-center rounded-2xl bg-sage-600 px-8 py-4 text-center text-xl font-bold text-white shadow-soft transition hover:bg-sage-700 focus:outline-none focus:ring-4 focus:ring-sage-200 sm:w-auto ${className}`}
      aria-label={`Call now at ${phoneDisplay}`}
    >
      Call Now
    </a>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 text-navy-950 sm:pb-0">
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-x-0 top-0 h-2 bg-sage-500" />
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 pb-12 pt-10 sm:px-8 lg:grid lg:min-h-[720px] lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:py-16">
          <div>
            <div className="mb-8 inline-flex rounded-full border border-sage-100 bg-sage-50 px-4 py-2 text-base font-semibold text-sage-700">
              Final expense life insurance support
            </div>

            <h1 className="max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-normal text-navy-950 sm:text-6xl lg:text-7xl">
              Affordable Final Expense Coverage
            </h1>

            <p className="mt-6 max-w-2xl text-xl leading-8 text-slate-700 sm:text-2xl sm:leading-9">
              Speak with a licensed agent today about options that may help
              cover funeral, burial, and final expenses.
            </p>

            <div className="mt-8 max-w-sm sm:max-w-none">
              <CallButton />
              <p className="mt-4 text-lg font-medium text-slate-600">
                No obligation. Simple phone consultation.
              </p>
            </div>

            <LeadForm />
          </div>

          <div className="rounded-3xl border border-slate-200 bg-navy-900 p-6 text-white shadow-soft sm:p-8">
            <div className="rounded-2xl bg-white p-6 text-navy-950 sm:p-8">
              <p className="text-lg font-semibold text-sage-700">
                Call a licensed agent
              </p>
              <p className="mt-3 text-4xl font-extrabold tracking-normal sm:text-5xl">
                {phoneDisplay}
              </p>
              <p className="mt-5 text-lg leading-7 text-slate-700">
                Get straightforward help reviewing final expense options by
                phone. No pressure and no complicated online process.
              </p>
              <div className="mt-7">
                <CallButton />
              </div>
            </div>

            <div className="mt-6 grid gap-3 text-lg font-semibold sm:grid-cols-2">
              {trustPoints.map((point) => (
                <div
                  key={point}
                  className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3"
                >
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 px-5 py-5 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {topTrustPoints.map((point) => (
            <div
              key={point}
              className="rounded-2xl bg-white px-5 py-4 text-lg font-bold text-navy-950 shadow-sm"
            >
              <span className="mb-3 block h-2 w-12 rounded-full bg-sage-500" />
              {point}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="max-w-3xl">
          <p className="text-lg font-bold text-sage-700">Why people call</p>
          <h2 className="mt-3 text-4xl font-extrabold leading-tight tracking-normal text-navy-950 sm:text-5xl">
            Guidance for families planning ahead.
          </h2>
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-sage-100 text-2xl font-extrabold text-sage-700">
                OK
              </div>
              <h3 className="text-2xl font-bold tracking-normal text-navy-950">
                {benefit.title}
              </h3>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-lg font-bold text-sage-700">
              Planning with less confusion
            </p>
            <h2 className="mt-3 text-4xl font-extrabold leading-tight tracking-normal text-navy-950 sm:text-5xl">
              A clear conversation can help your family prepare.
            </h2>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-soft sm:p-8">
            <p className="text-xl leading-8 text-slate-700">
              Many people delay final expense planning because they are unsure
              what coverage may cost or which option fits. The next step is
              simple: call, speak with a licensed agent, and review available
              options in plain language.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-navy-900 px-5 py-14 text-white sm:px-8 sm:py-18">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-lg font-bold text-sage-100">Trust and clarity</p>
            <h2 className="mt-3 text-4xl font-extrabold leading-tight tracking-normal sm:text-5xl">
              A calm phone conversation with clear next steps.
            </h2>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trustPoints.map((point) => (
              <div
                key={point}
                className="rounded-3xl border border-white/10 bg-white/10 p-5 text-xl font-bold"
              >
                <span className="mb-4 block h-2 w-16 rounded-full bg-sage-200" />
                {point}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="max-w-3xl">
          <p className="text-lg font-bold text-sage-700">How it works</p>
          <h2 className="mt-3 text-4xl font-extrabold leading-tight tracking-normal text-navy-950 sm:text-5xl">
            Start with one simple call.
          </h2>
        </div>

        <div className="mt-9 grid gap-5 lg:grid-cols-3">
          {steps.map((step) => (
            <article
              key={step.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8"
            >
              <p className="text-lg font-bold text-sage-700">{step.label}</p>
              <h3 className="mt-3 text-2xl font-bold tracking-normal text-navy-950">
                {step.title}
              </h3>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-lg font-bold text-sage-700">
              Common questions
            </p>
            <h2 className="mt-3 text-4xl font-extrabold leading-tight tracking-normal text-navy-950 sm:text-5xl">
              Straight answers before you call.
            </h2>
          </div>

          <div className="mt-9 grid gap-4 lg:grid-cols-2">
            {faqItems.map((item) => (
              <article
                key={item.question}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8"
              >
                <h3 className="text-2xl font-bold tracking-normal text-navy-950">
                  {item.question}
                </h3>
                <p className="mt-4 text-lg leading-8 text-slate-700">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-sage-50 p-7 text-center shadow-soft sm:p-12">
          <h2 className="text-4xl font-extrabold leading-tight tracking-normal text-navy-950 sm:text-5xl">
            Get Help Understanding Your Final Expense Options
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-xl leading-8 text-slate-700">
            Call today to speak with a licensed agent about options that may
            help your family plan for final expenses.
          </p>
          <div className="mx-auto mt-8 max-w-sm">
            <CallButton />
          </div>
        </div>
      </section>

      <footer className="bg-navy-950 px-5 py-8 text-center text-base leading-7 text-slate-300 sm:px-8">
        <p className="font-semibold text-white">
          Final expense coverage options explained by phone.
        </p>
        <p className="mt-2 font-semibold text-white">{phoneDisplay}</p>
        <p className="mx-auto mt-4 max-w-4xl">
          This website provides general information and connects consumers with
          licensed agent support. Coverage, benefits, premiums, and availability
          vary by state and individual circumstances. This page does not
          guarantee coverage or approval.
        </p>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-12px_30px_rgba(11,34,61,0.15)] backdrop-blur sm:hidden">
        <a
          href={phoneHref}
          className="flex min-h-16 items-center justify-center rounded-2xl bg-sage-600 px-6 text-center text-xl font-extrabold text-white"
          aria-label={`Call now at ${phoneDisplay}`}
        >
          Call Now: {phoneDisplay}
        </a>
      </div>
    </main>
  );
}
