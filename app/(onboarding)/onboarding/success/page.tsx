"use client";
import { Confetti } from "@/components/Confetti";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/store/useAuth";
import { IconArrowRight, IconSparkles } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import { PageHeader } from "../../_components/PageHeader";

const page = () => {
  const { user } = useAuth();

  console.log(user);

  const getRoleDestination = () => {
    switch (user?.role) {
      case "professional":
        return {
          href: "/dashboard/architect/services",
          label: "Set up your services",
        };
      case "brand":
      case "artisan":
        return {
          href: "/dashboard/store/inventory",
          label: "Manage your shop",
        };
      case "curator":
        return {
          href: "/profile/setup-content",
          label: "Start creating",
        };
      case "client":
      default:
        return {
          href: "/explore",
          label: "Start exploring",
        };
    }
  };

  const destination = getRoleDestination();

  return (
    <div className="container">
      <Confetti />
      <Logo color="black" />
      <div className="max-w-2xl">
        <PageHeader
          title={
            <>
              <IconSparkles className="text-primary size-10 inline-block mr-2" />
              Your Nuvylux account is ready!
            </>
          }
          description={
            user?.role === "client"
              ? "Welcome to the community! Discover top-tier professionals and unique handmade products tailored for you."
              : "Your professional presence is live. Now, let's get your business tools ready so you can start earning."
          }
        />

        <div className="mt-8 flex items-center gap-4">
          <Button asChild>
            <Link href={destination.href}>
              {destination.label}
              <IconArrowRight />
            </Link>
          </Button>

          {/* Secondary action for Professionals/Brands to see the client view */}
          {user?.role !== "client" && (
            <Button variant="secondary" asChild>
              <Link href="/explore">View Marketplace</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
