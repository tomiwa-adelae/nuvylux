import React from "react";
import { ServicesHero } from "../_components/ServicesHero";
import { ServicesPillars } from "../_components/ServicesPillars";
import { AudienceSection } from "../_components/AudienceSection";
import { HowItWorksSection } from "../_components/HowItWorksSection";
import { PartneringLogo } from "../_components/PartneringLogo";
import { FinalCtaSection } from "../_components/FinalCtaSection";

const page = () => {
  return (
    <div>
      <ServicesHero />
      <ServicesPillars />
      <AudienceSection />
      <HowItWorksSection />

      <PartneringLogo />

      {/* 6. Final Call to Action (Strong Close) */}
      <FinalCtaSection />
    </div>
  );
};

export default page;
