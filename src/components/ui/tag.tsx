import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  active?: boolean;
  onChange?: () => void;
  className?: string;
};

const Tag = ({
  active,
  onChange,
  children,
  className,
}: React.PropsWithChildren<Props>) => {
  return (
    <button
      className={cn(
        "text-text text-sm py-2 px-4 border border-transparent transition-all hover:border-[#1D1F21]",
        className,
        active && "border border-[#1D1F21]"
      )}
      onClick={onChange}
    >
      {children}
    </button>
  );
};

export default Tag;
