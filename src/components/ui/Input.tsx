import * as React from "react";

import { cn } from "../../lib/utils";

function Input({
  className,
  type,
  leftIcon,
  error,
  ...props
}: React.ComponentProps<"input"> & {
  leftIcon?: React.ReactElement;
  error?: string;
}) {
  return (
    <div className="w-full">
      <div className="relative">
        <input
          type={type}
          data-slot="input"
          aria-invalid={error ? "true" : "false"}
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            leftIcon && "pl-8",
            error &&
              "focus-visible:ring-destructive/30 focus-visible:border-destructive",
            className
          )}
          {...props}
        />
        {leftIcon && (
          <div className="absolute left-2 top-1/2 -translate-y-1/2">
            {leftIcon}
          </div>
        )}
      </div>
      {error && <p className="mt-1.5 text-sm text-destructive">{error}</p>}
    </div>
  );
}

export { Input };
