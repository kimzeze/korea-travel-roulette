import React from "react";
import cn  from "@/lib/utils/cn";

type TButton = {
  label: string;
  type: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
};

export default function Button({ label, type, className, onClick }: TButton) {
  return (
    <button
      type={type}
      className={cn(
        "h-[40px] w-[140px] border-2 border-primary text-[16px] hover:bg-secondary]",
        className
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
