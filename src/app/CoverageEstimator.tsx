"use client";

import { useMemo, useState } from "react";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function CoverageEstimator() {
  const [funeral, setFuneral] = useState(12000);
  const [medical, setMedical] = useState(8000);
  const [debt, setDebt] = useState(5000);
  const [savings, setSavings] = useState(3000);

  const target = useMemo(
    () => Math.max(5000, funeral + medical + debt - savings),
    [funeral, medical, debt, savings],
  );

  return (
    <section className="calculator-section" aria-labelledby="calculator-title">
      <div className="calculator-copy">
        <p className="section-kicker">Planning tool</p>
        <h2 id="calculator-title">Estimate a final-expense coverage target</h2>
        <p>
          This simple estimator helps visitors think through burial, medical, and
          unpaid debt costs before speaking with an agent.
        </p>
        <div className="calc-result">
          <span>Estimated final-expense target</span>
          <strong>{currency.format(target)}</strong>
        </div>
      </div>
      <form className="calculator">
        <label>
          Funeral and burial costs
          <input
            type="range"
            min="5000"
            max="25000"
            step="1000"
            value={funeral}
            onChange={(event) => setFuneral(Number(event.target.value))}
          />
          <span>{currency.format(funeral)}</span>
        </label>
        <label>
          Medical or care bills
          <input
            type="range"
            min="0"
            max="50000"
            step="1000"
            value={medical}
            onChange={(event) => setMedical(Number(event.target.value))}
          />
          <span>{currency.format(medical)}</span>
        </label>
        <label>
          Unpaid debt
          <input
            type="range"
            min="0"
            max="50000"
            step="1000"
            value={debt}
            onChange={(event) => setDebt(Number(event.target.value))}
          />
          <span>{currency.format(debt)}</span>
        </label>
        <label>
          Savings set aside
          <input
            type="range"
            min="0"
            max="30000"
            step="1000"
            value={savings}
            onChange={(event) => setSavings(Number(event.target.value))}
          />
          <span>{currency.format(savings)}</span>
        </label>
      </form>
    </section>
  );
}
