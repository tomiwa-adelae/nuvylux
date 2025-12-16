import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export const FinalCtaSection = () => {
  return (
    <section
      style={{
        backgroundImage: `url(/assets/images/primary-bg.png)`,
      }}
      className="py-24 md:py-32 text-white text-center"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl">
          Ready to experience the future of beauty and fashion?
        </h2>
        <div className="mt-10 flex items-center justify-center flex-col md:flex-row gap-2">
          <Button className="w-full md:w-auto" size="lg" variant={"black"}>
            <Link href="/register">Get Started Now</Link>
          </Button>
          <Button className="w-full md:w-auto" variant={"white"} size="lg">
            <Link href="/consultation">Book a Consultation</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
