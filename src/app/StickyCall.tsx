"use client";

import { useEffect, useState } from "react";

export default function StickyCall({ phoneHref }: { phoneHref: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function update() {
      setVisible(window.scrollY > 520);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <a
      className={`sticky-mobile-cta${visible ? " is-visible" : ""}`}
      href={phoneHref}
      data-event="call_click"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="sticky-phone-icon">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.35 1.89.66 2.78a2 2 0 0 1-.45 2.11L8.09 9.84a16 16 0 0 0 6.07 6.07l1.23-1.23a2 2 0 0 1 2.11-.45c.89.31 1.82.53 2.78.66A2 2 0 0 1 22 16.92Z" />
      </svg>
      Call now
    </a>
  );
}
