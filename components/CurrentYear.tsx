"use client";

import { useState, useEffect } from "react";

export default function CurrentYear() {
  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return <>{year}</>;
}
