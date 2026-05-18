"use client";

import { FormEvent, useState } from "react";

type CoverageInterest =
  | "Final expense"
  | "Burial insurance"
  | "Life insurance"
  | "Not sure";

type LeadFormData = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  state: string;
  age: string;
  coverageInterest: CoverageInterest;
};

type SubmitStatus = "idle" | "loading" | "success" | "error";

const initialFormData: LeadFormData = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  state: "",
  age: "",
  coverageInterest: "Final expense",
};

const coverageOptions: CoverageInterest[] = [
  "Final expense",
  "Burial insurance",
  "Life insurance",
  "Not sure",
];

const fieldClassName =
  "mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-lg text-navy-950 outline-none transition placeholder:text-slate-400 focus:border-sage-600 focus:ring-4 focus:ring-sage-100";

export default function LeadForm() {
  const [formData, setFormData] = useState<LeadFormData>(initialFormData);
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const canContinue =
    formData.state.trim() !== "" && formData.age.trim() !== "";

  function updateField<K extends keyof LeadFormData>(
    field: K,
    value: LeadFormData[K],
  ) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
    setStatus("idle");
  }

  function handleContinue() {
    if (!canContinue) {
      setErrorMessage("Please enter your state and age to continue.");
      setStatus("error");
      return;
    }

    setErrorMessage("");
    setStatus("idle");
    setStep(2);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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

      setFormData(initialFormData);
      setStep(1);
      setStatus("success");
    } catch {
      setErrorMessage(
        "Something went wrong. Please call us or try submitting again.",
      );
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-soft sm:max-w-2xl sm:p-6"
    >
      <div>
        <p className="text-lg font-bold text-navy-950">
          Prefer an agent to call you?
        </p>
        <p className="mt-2 text-base leading-7 text-slate-600">
          Calling is fastest. This short request form is a secondary option if
          you want an agent to follow up.
        </p>
      </div>

      <div className="mt-5" aria-label={`Step ${step} of 2`}>
        <div className="flex items-center justify-between text-sm font-bold text-slate-600">
          <span>Step {step} of 2</span>
          <span>{step === 1 ? "Basic fit" : "Contact details"}</span>
        </div>
        <div className="mt-2 h-3 rounded-full bg-slate-200">
          <div
            className={`h-3 rounded-full bg-sage-600 transition-all ${
              step === 1 ? "w-1/2" : "w-full"
            }`}
          />
        </div>
      </div>

      {step === 1 ? (
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="text-base font-semibold text-slate-700">
            State
            <input
              className={fieldClassName}
              name="state"
              type="text"
              autoComplete="address-level1"
              maxLength={30}
              value={formData.state}
              onChange={(event) => updateField("state", event.target.value)}
              required
            />
          </label>

          <label className="text-base font-semibold text-slate-700">
            Age
            <input
              className={fieldClassName}
              name="age"
              type="number"
              inputMode="numeric"
              min="18"
              max="120"
              value={formData.age}
              onChange={(event) => updateField("age", event.target.value)}
              required
            />
          </label>

          <label className="text-base font-semibold text-slate-700 sm:col-span-2">
            Coverage interest
            <select
              className={fieldClassName}
              name="coverageInterest"
              value={formData.coverageInterest}
              onChange={(event) =>
                updateField(
                  "coverageInterest",
                  event.target.value as CoverageInterest,
                )
              }
              required
            >
              {coverageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            onClick={handleContinue}
            className="inline-flex min-h-14 w-full items-center justify-center rounded-2xl bg-navy-900 px-6 py-4 text-lg font-bold text-white shadow-soft transition hover:bg-navy-800 focus:outline-none focus:ring-4 focus:ring-sage-200 sm:w-auto"
          >
            Continue
          </button>
        </div>
      ) : (
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="text-base font-semibold text-slate-700">
            First name
            <input
              className={fieldClassName}
              name="firstName"
              type="text"
              autoComplete="given-name"
              value={formData.firstName}
              onChange={(event) =>
                updateField("firstName", event.target.value)
              }
              required
            />
          </label>

          <label className="text-base font-semibold text-slate-700">
            Last name
            <input
              className={fieldClassName}
              name="lastName"
              type="text"
              autoComplete="family-name"
              value={formData.lastName}
              onChange={(event) => updateField("lastName", event.target.value)}
              required
            />
          </label>

          <label className="text-base font-semibold text-slate-700">
            Phone number
            <input
              className={fieldClassName}
              name="phone"
              type="tel"
              autoComplete="tel"
              value={formData.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              required
            />
          </label>

          <label className="text-base font-semibold text-slate-700">
            Email address
            <input
              className={fieldClassName}
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={(event) => updateField("email", event.target.value)}
              required
            />
          </label>

          <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex min-h-14 w-full items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-4 text-lg font-bold text-navy-950 transition hover:border-navy-900 focus:outline-none focus:ring-4 focus:ring-sage-100 sm:w-auto"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex min-h-14 w-full items-center justify-center rounded-2xl bg-navy-900 px-6 py-4 text-lg font-bold text-white shadow-soft transition hover:bg-navy-800 focus:outline-none focus:ring-4 focus:ring-sage-200 disabled:cursor-not-allowed disabled:bg-slate-500 sm:w-auto"
            >
              {status === "loading" ? "Requesting..." : "Request a Call"}
            </button>
          </div>
        </div>
      )}

      <p className="mt-4 text-sm leading-6 text-slate-600">
        By submitting, you agree to be contacted about life insurance options.
      </p>

      {status === "success" ? (
        <p className="mt-4 rounded-2xl border border-sage-100 bg-sage-50 px-4 py-3 text-base font-semibold text-sage-700">
          Thank you. Your request was received.
        </p>
      ) : null}

      {status === "error" && errorMessage ? (
        <p className="mt-4 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-base font-semibold text-red-700">
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}
