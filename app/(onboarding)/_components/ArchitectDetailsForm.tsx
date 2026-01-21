"use client";

import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/Loader";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { toast } from "sonner";
import { ArchitectSchema, ArchitectSchemaType } from "@/lib/zodSchemas";

export const ArchitectDetailsForm = () => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const form = useForm<ArchitectSchemaType>({
    resolver: zodResolver(ArchitectSchema),
    defaultValues: {
      profession: "",
      yearsOfExperience: "",
      bio: "",
      website: "",
      instagram: "",
    },
  });

  const onSubmit = (data: ArchitectSchemaType) => {
    startTransition(async () => {
      try {
        await api.post("/onboarding/architect-setup", data);
        toast.success("Professional profile saved!");
        // Architects still need to pick interests for their feed
        router.push("/onboarding/interests");
      } catch (error: any) {
        toast.error("Failed to save professional details");
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="profession"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary Profession</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="e.g. Makeup Artist" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="makeup_artist">Makeup Artist</SelectItem>
                    <SelectItem value="hairstylist">Hairstylist</SelectItem>
                    <SelectItem value="fashion_stylist">
                      Fashion Stylist
                    </SelectItem>
                    <SelectItem value="photographer">Photographer</SelectItem>
                    <SelectItem value="aesthetician">Aesthetician</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="yearsOfExperience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Years of Experience</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="0-2">0 - 2 years</SelectItem>
                    <SelectItem value="3-5">3 - 5 years</SelectItem>
                    <SelectItem value="5-10">5 - 10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Professional Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Briefly describe your style and expertise..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="instagram"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instagram Handle (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="@yourname" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Portfolio/Website (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="https://..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-2 pt-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Back
          </Button>
          <Button type="submit" disabled={pending}>
            {pending ? <Loader /> : "Continue"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
