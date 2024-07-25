import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  active?: boolean;
  onClick?: () => void;
  className?: string;
};

const Tag = ({
  active,
  onClick,
  children,
  className,
}: React.PropsWithChildren<Props>) => {
  return (
    <button
      className={cn(
        "border border-transparent px-4 py-2 text-sm text-text transition-all hover:border-[#1D1F21]",
        className,
        active && "border border-[#1D1F21]",
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Tag;
