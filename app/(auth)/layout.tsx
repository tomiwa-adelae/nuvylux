"use client";
import { useEffect } from "react";
import { Testimonials } from "./_components/Testimonials";
import { toast } from "sonner";
import { useAuth } from "@/store/useAuth";
import { useRouter } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/dashboard");
  }, [user]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const unauthenticated = params.get("unauthenticated");
      const logout = params.get("logout");

      if (unauthenticated === "true") {
        toast.error("Your session has expired. Please log in again.");
      }

      if (logout === "true") {
        toast.success("You've been logged out successfully.");
      }
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <Testimonials />
      <div className="flex min-h-[80vh] w-full items-center justify-center">
        {children}
      </div>
    </div>
  );
}
