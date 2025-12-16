import {
  IconDeviceLaptop,
  IconPalette,
  IconSparkles,
  IconTrendingUp,
} from "@tabler/icons-react";
import React from "react";

export const HowItWorksSection = () => {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="font-semibold text-2xl md:text-3xl 2xl:text-4xl text-center mb-8">
          Your Path to Illumination
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          <HowItWorksStep
            step="1"
            title="Discover"
            description="Explore your needs and the full NUVYLUX capability menu."
            icon={IconSparkles}
          />
          <HowItWorksStep
            step="2"
            title="Choose"
            description="Select a service, program, or partnership track."
            icon={IconPalette}
          />
          <HowItWorksStep
            step="3"
            title="Personalize"
            description="Tailor the journey for maximum impact and unique results."
            icon={IconDeviceLaptop}
          />
          <HowItWorksStep
            step="4"
            title="Grow"
            description="Execute, connect, and achieve measurable growth."
            icon={IconTrendingUp}
          />
        </div>
      </div>
    </section>
  );
};

interface HowItWorksStepProps {
  step: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const HowItWorksStep: React.FC<HowItWorksStepProps> = ({
  step,
  title,
  description,
  icon: Icon,
}) => (
  <div className="relative text-center">
    <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 rounded-full border-4 border-gray-700 bg-gray-800 text-white shadow-xl">
      <Icon className="h-6 w-6" />
    </div>
    <span className="text-xs font-semibold uppercase tracking-widest text-primary-light block mb-2">
      Step {step}
    </span>
    <h4 className="text-2xl font-bold mb-2">{title}</h4>
    <p className="text-gray-400 text-sm">{description}</p>
  </div>
);
