import { Confetti } from "@/components/Confetti";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { IconSparkles } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="container">
      <Confetti />
      <Logo color="black" />
      <h1 className="text-3xl lg:text-4xl font-medium mt-8">
        <IconSparkles className="text-primary size-10 inline-block" /> Your
        account is ready!
      </h1>
      <p className="text-muted-foreground text-sm">
        You’re all set. Start exploring, booking, or offering services
      </p>
      <div className="mt-4">
        <Button asChild>
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default page;
