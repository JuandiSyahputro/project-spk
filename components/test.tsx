"use client"; // Pastikan ini adalah client component

import { useEffect, useState } from "react";

export default function FallbackLoader() {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowFallback(true);
    }, 4000); // Delay fallback selama 300ms

    return () => clearTimeout(timeout);
  }, []);

  if (!showFallback) return null;

  return <div className="z-50 bg-black/50 fixed inset-0 flex items-center justify-center">Loading...</div>;
}
