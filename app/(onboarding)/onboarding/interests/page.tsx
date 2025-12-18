import { Logo } from "@/components/Logo";
import React from "react";
import { OnboardingInterests } from "../../_components/OnboardingInterests";

const page = () => {
  return (
    <div className="container">
      <Logo color="black" />
      <h1 className="text-3xl lg:text-4xl font-medium mt-8">
        Help us tailor your experience?
      </h1>
      <p className="text-muted-foreground text-sm">
        Please select two or more to proceed
      </p>
      <OnboardingInterests />
    </div>
  );
};

export default page;
