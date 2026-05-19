import LeadForm from "./LeadForm";
import CoverageEstimator from "./CoverageEstimator";
import StickyCall from "./StickyCall";

const phoneDisplay = "1-850-977-9719";
const phoneHref = "tel:+18509779719";

const trustItems = [
  {
    title: "Licensed agents",
    description: "Clear final-expense options explained by phone",
  },
  {
    title: "No pressure",
    description: "A simple consultation with no obligation to enroll",
  },
  {
    title: "Coverage varies",
    description: "Options depend on state, age, and eligibility requirements",
  },
  {
    title: "Fast phone help",
    description: "Call now or request a callback from an agent",
  },
];

const reasons = [
  {
    title: "Affordable monthly options",
    description: "Budget-conscious choices are discussed in clear, non-pressuring terms.",
  },
  {
    title: "Final expenses",
    description: "Funeral, burial, medical bills, and unpaid debt are made concrete.",
  },
  {
    title: "Phone-first guidance",
    description: "The call path stays prominent for visitors who do not want a long form.",
  },
  {
    title: "Clear limits",
    description: "Coverage is not guaranteed and availability varies by state and eligibility.",
  },
];

const steps = [
  {
    label: "01",
    title: "Call today",
    description: "Tap the call button and connect with an agent during available phone hours.",
  },
  {
    label: "02",
    title: "Speak with a licensed agent",
    description: "Share your needs and questions with someone who can explain options.",
  },
  {
    label: "03",
    title: "Review available options",
    description: "Compare choices that may fit your goals, budget, and family priorities.",
  },
];

const faqs = [
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

function PhoneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="icon">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.35 1.89.66 2.78a2 2 0 0 1-.45 2.11L8.09 9.84a16 16 0 0 0 6.07 6.07l1.23-1.23a2 2 0 0 1 2.11-.45c.89.31 1.82.53 2.78.66A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function TreeIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="brand-icon">
      <path d="M12 3 8.4 8.7h2.1L7 14.4h3.2L7.7 19h8.6L13.8 14.4H17l-3.5-5.7h2.1L12 3Z" />
      <path d="M12 18v4" />
    </svg>
  );
}

function CallButton({ secondary = false }: { secondary?: boolean }) {
  return (
    <a
      href={phoneHref}
      className={secondary ? "btn btn-secondary" : "btn btn-primary"}
      data-event="call_click"
      aria-label={`Call now at ${phoneDisplay}`}
    >
      <PhoneIcon />
      Call now
    </a>
  );
}

export default function Home() {
  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="TwoTree Quote home">
          <span className="brand-mark">
            <TreeIcon />
          </span>
          <span>
            <strong>TwoTree</strong>
            <small>Quote</small>
          </span>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#coverage">Why call</a>
          <a href="#how">How it works</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a className="header-call" href={phoneHref} data-event="call_click">
          <PhoneIcon />
          <span>{phoneDisplay}</span>
        </a>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-media" aria-hidden="true" />
          <div className="hero-overlay" aria-hidden="true" />
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">
                <span />
                Final expense life insurance guidance
              </p>
              <h1 id="hero-title">Affordable Final Expense Coverage</h1>
              <p className="hero-subhead">
                Speak with a licensed agent today about options that may help cover
                funeral, burial, medical, and other final expenses.
              </p>
              <div className="hero-actions" aria-label="Primary actions">
                <CallButton />
                <a className="btn btn-secondary" href="#quote" data-event="quote_start">
                  Request a callback
                </a>
              </div>
              <div className="proof-row" aria-label="Trust proof">
                <span>
                  <strong>No</strong> obligation
                </span>
                <span>
                  <strong>Simple</strong> phone consultation
                </span>
                <span>
                  <strong>Licensed</strong> agents
                </span>
              </div>
            </div>

            <LeadForm />
          </div>
        </section>

        <section className="trust-band" aria-label="Trust signals">
          {trustItems.map((item) => (
            <div className="trust-item" key={item.title}>
              <strong>{item.title}</strong>
              <span>{item.description}</span>
            </div>
          ))}
        </section>

        <section className="two-tree-method" aria-labelledby="method-title">
          <div className="section-heading">
            <p className="section-kicker">Two ways to get help</p>
            <h2 id="method-title">Call now, or request a callback.</h2>
            <p>
              TwoTree Quote keeps the process simple for final-expense shoppers:
              connect by phone when you are ready, or leave a short request if you
              prefer a follow-up.
            </p>
          </div>
          <div className="method-grid">
            <article>
              <div className="tree-icon" aria-hidden="true">
                <PhoneIcon />
              </div>
              <h3>Call now</h3>
              <p>
                The fastest path for people who want straightforward help reviewing
                final-expense options by phone.
              </p>
            </article>
            <article>
              <div className="tree-icon" aria-hidden="true">
                <TreeIcon />
              </div>
              <h3>Request a callback</h3>
              <p>
                A short secondary path for visitors who want an agent to follow up at
                a better time.
              </p>
            </article>
          </div>
        </section>

        <section className="section product-section" id="coverage">
          <div className="section-heading">
            <p className="section-kicker">Why people call</p>
            <h2>Guidance for families planning ahead</h2>
            <p>
              The message stays focused on family burden reduction, affordability,
              and plain-language phone guidance.
            </p>
          </div>
          <div className="segment-panel">
            <div>
              <p className="section-kicker">Help protect loved ones</p>
              <h3>Options that may help cover funeral, burial, and final expenses</h3>
              <p>
                Explore coverage designed to help reduce the financial burden of
                common end-of-life costs.
              </p>
            </div>
            <ul>
              <li>Primary CTA: Call now</li>
              <li>Secondary path: short callback request</li>
              <li>Trust cue: licensed agents</li>
            </ul>
          </div>
        </section>

        <section className="split-section problem-section">
          <div>
            <p className="section-kicker">Planning with less confusion</p>
            <h2>A clear conversation can help your family prepare.</h2>
            <p>
              Many people delay final-expense planning because they are unsure what
              coverage may cost or which option fits. The next step is simple: call,
              speak with a licensed agent, and review available options in plain language.
            </p>
          </div>
          <div className="reason-grid" aria-label="Buyer concerns">
            {reasons.map((reason) => (
              <article key={reason.title}>
                <h3>{reason.title}</h3>
                <p>{reason.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section process-section" id="how">
          <div className="section-heading">
            <p className="section-kicker">How it works</p>
            <h2>Start with one simple call</h2>
          </div>
          <div className="process-grid">
            {steps.map((step) => (
              <article key={step.title}>
                <span>{step.label}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <CoverageEstimator />

        <section className="section faq-section" id="faq">
          <div className="section-heading">
            <p className="section-kicker">Common questions</p>
            <h2>Straight answers before you call</h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <details key={faq.question} open={index === 0}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="final-cta" aria-labelledby="final-title">
          <div>
            <p className="section-kicker">Next step</p>
            <h2 id="final-title">Get help understanding your final expense options</h2>
            <p>
              Call today to speak with a licensed agent about options that may help
              your family plan for final expenses.
            </p>
          </div>
          <div className="final-actions">
            <CallButton />
            <a className="btn btn-secondary" href="#quote" data-event="quote_start">
              Request callback
            </a>
          </div>
        </section>
      </main>

      <StickyCall phoneHref={phoneHref} />

      <footer className="site-footer">
        <div>
          <a className="brand footer-brand" href="#top" aria-label="TwoTree Quote home">
            <span className="brand-mark">
              <TreeIcon />
            </span>
            <span>
              <strong>TwoTree</strong>
              <small>Quote</small>
            </span>
          </a>
          <p>
            TwoTree Quote final-expense landing page system. Replace all agency,
            carrier, licensing, consent, and availability claims before production.
          </p>
        </div>
        <div>
          <strong>Compliance notes</strong>
          <p>
            This website provides general information and connects consumers with
            licensed agents. Coverage, benefits, premiums, and availability vary by
            state and individual circumstances. This page does not guarantee coverage
            or approval.
          </p>
        </div>
        <div>
          <strong>Contact</strong>
          <p>
            Licensed agent line: <a href={phoneHref}>{phoneDisplay}</a>
          </p>
          <p>Hours: 24/7</p>
        </div>
      </footer>
    </>
  );
}
