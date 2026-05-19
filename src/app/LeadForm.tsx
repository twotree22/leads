"use client";

import { FormEvent, useState } from "react";

type LeadFormData = {
  state: string;
  age: string;
  coverageInterest: string;
  fullName: string;
  phone: string;
  email: string;
  contactTime: string;
  consent: boolean;
};

type SubmitStatus = "idle" | "loading" | "success" | "error";

const initialFormData: LeadFormData = {
  state: "",
  age: "",
  coverageInterest: "",
  fullName: "",
  phone: "",
  email: "",
  contactTime: "",
  consent: false,
};

const states = [
  "Alabama",
  "California",
  "Florida",
  "Georgia",
  "Illinois",
  "New York",
  "North Carolina",
  "Ohio",
  "Pennsylvania",
  "Texas",
];

const coverageOptions = [
  "Final expense",
  "Burial insurance",
  "Life insurance",
  "Not sure",
];

export default function LeadForm() {
  const [formData, setFormData] = useState<LeadFormData>(initialFormData);
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const progress = step === 0 ? 50 : 100;

  function updateField<K extends keyof LeadFormData>(
    field: K,
    value: LeadFormData[K],
  ) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
    setStatus("idle");
    setErrorMessage("");
  }

  function validateStep() {
    if (step === 0) {
      return (
        formData.state.trim() !== "" &&
        formData.age.trim() !== "" &&
        formData.coverageInterest.trim() !== ""
      );
    }

    return (
      formData.fullName.trim() !== "" &&
      formData.phone.trim() !== "" &&
      formData.contactTime.trim() !== "" &&
      formData.consent
    );
  }

  function handleContinue() {
    if (!validateStep()) {
      setStatus("error");
      setErrorMessage("Please complete the required fields before continuing.");
      return;
    }

    setStep(1);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateStep()) {
      setStatus("error");
      setErrorMessage("Please complete the required fields before submitting.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Lead request failed");
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please call us or try submitting again.");
    }
  }

  return (
    <aside className="quote-shell" id="quote" aria-label="Callback request form">
      <div className="quote-head">
        <div>
          <p className="section-kicker">Prefer an agent to call you?</p>
          <h2>Request a simple callback</h2>
        </div>
        <span className="secure-badge">Secure</span>
      </div>

      <p className="microcopy form-intro">
        Calling is fastest. This short request form is a secondary option if you
        want an agent to follow up.
      </p>

      <div className="progress-wrap" aria-label="Form progress">
        <div className="progress-label">
          <span>Step {step + 1} of 2</span>
          <strong>{progress}%</strong>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <form className="lead-form" onSubmit={handleSubmit}>
        {step === 0 ? (
          <fieldset className="form-step is-active">
            <legend>Basic fit</legend>
            <label>
              State
              <select
                name="state"
                value={formData.state}
                onChange={(event) => updateField("state", event.target.value)}
                required
              >
                <option value="">Select state</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Age
              <input
                name="age"
                type="number"
                min="45"
                max="85"
                inputMode="numeric"
                value={formData.age}
                onChange={(event) => updateField("age", event.target.value)}
                required
              />
            </label>
            <label>
              Coverage interest
              <select
                name="coverageInterest"
                value={formData.coverageInterest}
                onChange={(event) =>
                  updateField("coverageInterest", event.target.value)
                }
                required
              >
                <option value="">Select interest</option>
                {coverageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </fieldset>
        ) : (
          <fieldset className="form-step is-active">
            <legend>Callback details</legend>
            <label>
              Full name
              <input
                name="fullName"
                type="text"
                autoComplete="name"
                value={formData.fullName}
                onChange={(event) => updateField("fullName", event.target.value)}
                required
              />
            </label>
            <label>
              Phone
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                value={formData.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                required
              />
            </label>
            <label>
              Email optional
              <input
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={(event) => updateField("email", event.target.value)}
              />
            </label>
            <label>
              Best contact time
              <select
                name="contactTime"
                value={formData.contactTime}
                onChange={(event) => updateField("contactTime", event.target.value)}
                required
              >
                <option value="">Select time</option>
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
              </select>
            </label>
            <label className="consent-line">
              <input
                name="consent"
                type="checkbox"
                checked={formData.consent}
                onChange={(event) => updateField("consent", event.target.checked)}
                required
              />
              <span>
                I agree to be contacted about life insurance options. Consent is
                not a condition of purchase.
              </span>
            </label>
          </fieldset>
        )}

        {status === "success" ? (
          <div className="form-result">
            <strong>Your callback request is ready for agent review.</strong>
            <p>An agent can follow up using the contact details you submitted.</p>
          </div>
        ) : null}

        {status === "error" && errorMessage ? (
          <div className="form-result form-error">
            <strong>{errorMessage}</strong>
          </div>
        ) : null}

        <div className="form-actions">
          <button
            className="btn btn-ghost"
            type="button"
            onClick={() => setStep(0)}
            disabled={step === 0 || status === "loading"}
          >
            Back
          </button>
          {step === 0 ? (
            <button className="btn btn-primary" type="button" onClick={handleContinue}>
              Continue
            </button>
          ) : (
            <button
              className="btn btn-primary"
              type="submit"
              disabled={status === "loading" || status === "success"}
            >
              {status === "loading" ? "Submitting..." : "Submit request"}
            </button>
          )}
        </div>
        <p className="microcopy">
          Licensed agents. No obligation consultation. Coverage availability varies
          by state and individual circumstances.
        </p>
      </form>
    </aside>
  );
}
