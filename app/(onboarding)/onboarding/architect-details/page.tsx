import { Logo } from "@/components/Logo";
import React from "react";
import { ArchitectDetailsForm } from "../../_components/ArchitectDetailsForm";
import { PageHeader } from "../../_components/PageHeader";

const page = () => {
  return (
    <div className="container">
      <Logo color="black" />
      <PageHeader
        title="Tell us about your craft"
        description="Share your professional background so clients know what you excel at."
      />
      <div className="mt-8">
        <ArchitectDetailsForm />
      </div>
    </div>
  );
};

export default page;
