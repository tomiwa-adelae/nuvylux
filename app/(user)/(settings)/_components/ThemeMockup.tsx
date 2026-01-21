import React from "react";

export const ThemeMockup = ({ isDark }: { isDark: boolean }) => {
  return (
    <div
      className={`w-full rounded-md border p-2 shadow-sm ${
        isDark ? "bg-zinc-950 border-zinc-800" : "bg-white border-zinc-200"
      }`}
    >
      <div className="space-y-2">
        {/* Navbar area */}
        <div className="flex items-center justify-between">
          <div
            className={`h-2 w-2 rounded-full ${
              isDark ? "bg-blue-500" : "bg-blue-600"
            }`}
          />
          <div className="flex gap-1">
            <div
              className={`h-2 w-4 rounded-sm ${
                isDark ? "bg-zinc-800" : "bg-zinc-100"
              }`}
            />
            <div
              className={`h-2 w-2 rounded-sm ${
                isDark ? "bg-blue-500" : "bg-blue-600"
              }`}
            />
          </div>
        </div>
        {/* Content area */}
        <div className="flex gap-2">
          <div className="space-y-1 flex-1">
            <div
              className={`h-1.5 w-full rounded-sm ${
                isDark ? "bg-zinc-800" : "bg-zinc-100"
              }`}
            />
            <div
              className={`h-1.5 w-3/4 rounded-sm ${
                isDark ? "bg-zinc-800" : "bg-zinc-100"
              }`}
            />
            <div
              className={`h-1.5 w-1/2 rounded-sm ${
                isDark ? "bg-zinc-800" : "bg-zinc-100"
              }`}
            />
          </div>
          <div
            className={`h-12 w-20 rounded-sm ${
              isDark ? "bg-zinc-800" : "bg-zinc-100"
            }`}
          />
        </div>
        {/* Bottom element */}
        <div
          className={`h-2 w-12 rounded-sm ${
            isDark ? "bg-zinc-800" : "bg-zinc-100"
          }`}
        />
      </div>
    </div>
  );
};
