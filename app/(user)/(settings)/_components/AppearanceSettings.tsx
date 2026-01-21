"use client";

import { useTheme } from "next-themes";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ThemeMockup } from "./ThemeMockup";

export const AppearanceSettings = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Preference mode</h3>
        <p className="text-sm text-muted-foreground">
          Customize how your interface looks and feels.
        </p>
      </div>

      <RadioGroup
        defaultValue={theme}
        onValueChange={(value) => setTheme(value)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Light Mode Option */}
        <Label
          htmlFor="light"
          className={`flex p-0 flex-col gap-0 overflow-hidden rounded-xl border-2 transition-all cursor-pointer ${
            theme === "light"
              ? "border-primary"
              : "border-transparent bg-muted/50"
          }`}
        >
          <div className="p-4 w-full flex justify-center">
            <ThemeMockup isDark={false} />
          </div>
          <div className="flex items-center gap-2 p-4 bg-muted w-full">
            <RadioGroupItem value="light" id="light" />
            <span className="font-medium">Light mode</span>
          </div>
        </Label>

        {/* Dark Mode Option */}
        <Label
          htmlFor="dark"
          className={`flex flex-col gap-0 overflow-hidden rounded-xl border-2 transition-all cursor-pointer ${
            theme === "dark"
              ? "border-primary"
              : "border-transparent bg-muted/50"
          }`}
        >
          <div className="p-4 w-full bg-zinc-700 flex justify-center">
            <ThemeMockup isDark={true} />
          </div>
          <div className="flex items-center gap-2 p-4 bg-zinc-900 text-white w-full">
            <RadioGroupItem value="dark" id="dark" />
            <span className="font-medium">Dark mode</span>
          </div>
        </Label>
      </RadioGroup>
    </div>
  );
};
