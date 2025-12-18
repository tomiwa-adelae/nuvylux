import { Logo } from "@/components/Logo";
import React from "react";
import { OnboardingProfileForm } from "../../_components/OnboardingProfileForm";

const page = () => {
  return (
    <div className="container">
      <Logo color="black" />
      <h1 className="text-3xl lg:text-4xl font-medium mt-8">
        Set up your NUVYLUX profile
      </h1>
      <p className="text-muted-foreground text-sm mb-4">
        We just need a few more details to tailor your experience on Nuvylux.
      </p>
      <OnboardingProfileForm />
    </div>
  );
};

export default page;
