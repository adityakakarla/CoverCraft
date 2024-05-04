"use client";

import { getUserCredits } from "@/app/actions";
import { useState, useEffect } from "react";
import ResumeForm from "@/components/ResumeForm";
import Generator from "@/components/CoverLetterGenerator";
import { ring } from "ldrs";

export default function Page() {
  const [exists, setExists] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    async function checkUserExists() {
      const credits = await getUserCredits();
      if (credits == -1) {
        setExists(false);
        setLoaded(true);
      } else {
        setExists(true);
        setCredits(credits);
        setLoaded(true);
      }
    }
    checkUserExists();

  }, [exists]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      ring.register();
    }
  }, []);

  if (!loaded) {
    return (
      <l-ring
        size="40"
        stroke="5"
        bg-opacity="0"
        speed="2" 
        color="black" 
      ></l-ring>
    );
  } else if (exists) {
    return <Generator initialCredits={credits} />;
  } else {
    return <ResumeForm setExists={setExists} />;
  }
}
