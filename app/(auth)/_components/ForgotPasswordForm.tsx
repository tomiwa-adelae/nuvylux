"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
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
  forgotPasswordFormSchema,
  ForgotPasswordFormSchemaType,
} from "@/lib/zodSchemas";
import Link from "next/link";
import { useTransition } from "react";
import { Loader } from "@/components/Loader";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export function ForgotPasswordForm() {
  const router = useRouter();

  const [pending, startTransition] = useTransition();

  const form = useForm<ForgotPasswordFormSchemaType>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: ForgotPasswordFormSchemaType) {
    startTransition(async () => {
      try {
        const res = await api.post("/auth/forgot-password", data);
        // setUser(res.data.user);
        toast.success(res.data.message);
        router.replace(`/verify-code?email=${data.email}`);
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    });
  }
  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={pending} className="w-full" type="submit">
            {pending ? <Loader /> : "Continue"}
          </Button>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-card px-2 text-muted-foreground">
              Or
            </span>
          </div>
          <p className="text-muted-foreground text-sm text-center">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-primary hover:text-primary hover:underline "
            >
              Register
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
