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
      Call now
    </a>
  );
}
