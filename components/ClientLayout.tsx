"use client";

import IdeaPopup from "./IdeaPopup";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <IdeaPopup />
    </>
  );
}
