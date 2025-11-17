"use client";

import IdeaPopup from "./IdeaPopup";
import CookieBanner from "./CookieBanner";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <IdeaPopup />
      <CookieBanner />
    </>
  );
}
