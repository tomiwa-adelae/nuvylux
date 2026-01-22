"use client";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { Button } from "./ui/button";
import { IconArrowLeft } from "@tabler/icons-react";
import { Badge } from "./ui/badge";

interface PageHeaderProps {
  title: string;
  description?: string | any;
  action?: ReactNode;
  back?: boolean;
  badges?: string[];
}

export function PageHeader({
  title,
  description,
  action,
  back,
  badges,
}: PageHeaderProps) {
  const router = useRouter();

  return (
    <div className="mb-4">
      <div className="flex items-start justify-start gap-2">
        {back && (
          <Button
            onClick={() => router.back()}
            size="icon"
            variant={"secondary"}
          >
            <IconArrowLeft />
          </Button>
        )}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-0 md:items-center">
          <div>
            <h1 className="text-3xl font-semibold">{title}</h1>
            {description && (
              <p className="mt-2 text-sm md:text-base text-muted-foreground">
                {description}
              </p>
            )}

            {badges && (
              <div className="flex gap-2 mt-2.5">
                {badges.map((badge) => (
                  <Badge variant={"secondary"}>{badge}</Badge>
                ))}
              </div>
            )}
          </div>
        </div>
        {action && <div className="w-full md:w-auto">{action}</div>}
      </div>
    </div>
  );
}
