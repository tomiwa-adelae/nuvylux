import { Logo } from "@/components/Logo";
import { PageHeader } from "@/components/PageHeader";
import React from "react";
import { OnboardingPersona } from "../_components/OnboardingPersona";

const page = () => {
  return (
    <div className="container">
      <Logo color="black" />
      <h1 className="text-3xl lg:text-4xl mb-4 font-medium mt-8">
        How would you like to experience the light?
      </h1>
      <OnboardingPersona />
    </div>
  );
};

export default page;
