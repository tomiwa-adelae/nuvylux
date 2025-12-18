"use client";
import { useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/store/useAuth";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { OnboardingTestimonials } from "./_components/OnboardingTestimonials";
import { Logo } from "@/components/Logo";
import { PageGradient } from "@/components/PageGradient";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // if (!user) router.push("/login");
  }, [user]);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const params = new URLSearchParams(window.location.search);
  //     const unauthenticated = params.get("unauthenticated");
  //     const logout = params.get("logout");

  //     if (unauthenticated === "true") {
  //       toast.error("Your session has expired. Please log in again.");
  //     }

  //     if (logout === "true") {
  //       toast.success("You've been logged out successfully.");
  //     }
  //   }
  // }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
      <div className="lg:col-span-3 flex min-h-[80vh] w-full items-start justify-center relative py-4 md:py-12">
        <PageGradient />
        {children}
      </div>
      <OnboardingTestimonials />
    </div>
  );
}
