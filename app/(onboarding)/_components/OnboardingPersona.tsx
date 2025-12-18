"use client";
import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import api from "@/lib/api";
import { cn } from "@/lib/utils";
import { IconCompass, IconSparkles } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";

export const OnboardingPersona = () => {
  const router = useRouter();
  const [selectedPersona, setSelectedPersona] = useState("");
  const [pending, startTransition] = useTransition();

  const personas = [
    {
      icon: IconSparkles,
      name: (
        <>
          The Visionary <br />
          (Client)
        </>
      ),
      value: "client",
    },
    {
      icon: IconCompass,
      name: (
        <>
          The Architect <br />
          (Professional)
        </>
      ),
      value: "professional",
    },
  ];

  const handleSubmit = () => {
    startTransition(async () => {
      try {
        const res = await api.post("/onboarding/role", {
          role: selectedPersona,
        });

        toast.success(res?.data?.message);
        router.push("/onboarding/interests");
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Internal server error");
      }
    });
  };

  return (
    <div className="mt-8">
      <div className="grid grid-cols-2 gap-2 md:gap-4">
        {personas.map((persona, index) => (
          <Card
            onClick={() => setSelectedPersona(persona.value)}
            key={index}
            className={cn(
              "py-20 h-full cursor-pointer hover:bg-primary transition-all group",
              selectedPersona === persona.value &&
                "bg-primary text-white hover:bg-primary/90"
            )}
          >
            <CardContent className="flex text-center items-center flex-col justify-center gap-2">
              <persona.icon
                className={cn(
                  "group-hover:text-white transition-all size-8 text-primary",
                  selectedPersona === persona.value && "text-white"
                )}
              />
              <CardTitle className="group-hover:text-white">
                {persona.name}
              </CardTitle>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex items-center justify-start gap-2 mt-8">
        <Button variant={"outline"}>Back</Button>
        <Button onClick={handleSubmit} disabled={pending || !selectedPersona}>
          {pending ? <Loader /> : "Continue"}
        </Button>
      </div>
    </div>
  );
};
