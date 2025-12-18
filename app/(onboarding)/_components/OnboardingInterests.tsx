"use client";
import { Loader } from "@/components/Loader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { cn } from "@/lib/utils";
import {
  IconBrush,
  IconCamera,
  IconDeviceWatch,
  IconDiamond,
  IconHeart,
  IconPencil,
  IconScissors,
  IconShirt,
  IconShoe,
  IconSparkles,
  IconStackFront,
  IconVideo,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";

export const OnboardingInterests = () => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const interests = [
    { icon: IconSparkles, name: "Skincare" },
    { icon: IconBrush, name: "Makeup" },
    { icon: IconScissors, name: "Hair" },
    { icon: IconHeart, name: "Wellness" },
    { icon: IconShoe, name: "Streetwear" },
    { icon: IconDiamond, name: "Luxury" },
    { icon: IconShirt, name: "Ready-to-wear" },
    { icon: IconDeviceWatch, name: "Ready-to-Accessories" },
    { icon: IconCamera, name: "Photography" },
    { icon: IconStackFront, name: "Styling" },
    { icon: IconPencil, name: "Design" },
    { icon: IconVideo, name: "Content Creation" },
  ];

  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const addInterest = (name: string) => {
    if (!selectedInterests.some((c) => c === name)) {
      setSelectedInterests([...selectedInterests, name]);
    }
  };

  const removeAmenity = (name: string) => {
    setSelectedInterests(selectedInterests.filter((i) => i !== name));
  };

  const handleSubmit = () => {
    startTransition(async () => {
      console.log(selectedInterests);
      try {
        const res = await api.post("/onboarding/interests", selectedInterests);

        toast.success(res?.data?.message);
        router.push("/onboarding/profile");
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Internal server error");
      }
    });
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mt-6">
        {interests.map((interest, index) => {
          const isSelected = selectedInterests.some((a) => a === interest.name);
          return (
            <Badge
              key={index}
              onClick={() =>
                isSelected
                  ? removeAmenity(interest.name)
                  : addInterest(interest.name)
              }
              variant={"outline"}
              className={cn(
                "p-2 cursor-pointer hover:border-primary",
                isSelected && "border-primary bg-primary/10"
              )}
            >
              <interest.icon />
              <p>{interest.name}</p>
            </Badge>
          );
        })}
      </div>
      <div className="flex items-center justify-start gap-2 mt-8">
        <Button onClick={() => router.back()} variant={"outline"}>
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={pending || selectedInterests.length < 2}
        >
          {pending ? <Loader /> : "Continue"}
        </Button>
      </div>
    </div>
  );
};
