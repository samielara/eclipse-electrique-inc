import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-1 md:grid-cols-3 gap-4",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: {
  name: string;
  className?: string;
  background?: ReactNode;
  Icon?: React.ComponentType<{ className?: string }>;
  description: string;
  href: string;
  cta: string;
}) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-2xl",
      "bg-[#0a0f18] [box-shadow:0_0_0_1px_rgba(255,255,255,.07),0_2px_4px_rgba(0,0,0,.5),0_12px_24px_rgba(0,0,0,.5)]",
      "hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transition-all duration-300",
      className
    )}
  >
    <div className="absolute inset-0 z-0">{background}</div>
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-2">
      {Icon && (
        <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-2">
          <Icon className="h-6 w-6 origin-left transform-gpu text-amber-400 transition-all duration-300 ease-in-out group-hover:scale-110" />
        </div>
      )}
      <h3 className="text-xl font-semibold text-white tracking-wide">
        {name}
      </h3>
      <p className="max-w-lg text-slate-300 text-sm leading-relaxed">{description}</p>
    </div>

    <div
      className={cn(
        "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 z-20"
      )}
    >
      <Button variant="ghost" asChild size="sm" className="pointer-events-auto text-amber-400 hover:text-amber-300 hover:bg-white/5">
        <a href={href} className="inline-flex items-center">
          {cta}
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </div>
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-amber-500/[.03]" />
  </div>
);
