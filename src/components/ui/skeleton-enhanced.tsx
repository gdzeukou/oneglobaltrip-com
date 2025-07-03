
import { cn } from "@/lib/utils"
import { Skeleton } from "./skeleton"

interface SkeletonProps {
  className?: string;
  variant?: 'default' | 'card' | 'text' | 'avatar' | 'button';
  lines?: number;
  animate?: boolean;
}

function SkeletonEnhanced({
  className,
  variant = 'default',
  lines = 1,
  animate = true,
  ...props
}: SkeletonProps) {
  const baseClasses = cn(
    animate && "animate-pulse",
    "bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]",
    animate && "animate-shimmer"
  );

  if (variant === 'card') {
    return (
      <div className={cn("space-y-3", className)} {...props}>
        <Skeleton className={cn(baseClasses, "h-48 w-full rounded-lg")} />
        <div className="space-y-2">
          <Skeleton className={cn(baseClasses, "h-4 w-3/4")} />
          <Skeleton className={cn(baseClasses, "h-4 w-1/2")} />
        </div>
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className={cn("space-y-2", className)} {...props}>
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton 
            key={i} 
            className={cn(
              baseClasses, 
              "h-4", 
              i === lines - 1 ? "w-3/4" : "w-full"
            )} 
          />
        ))}
      </div>
    );
  }

  if (variant === 'avatar') {
    return (
      <Skeleton className={cn(baseClasses, "h-12 w-12 rounded-full", className)} {...props} />
    );
  }

  if (variant === 'button') {
    return (
      <Skeleton className={cn(baseClasses, "h-10 w-24 rounded-md", className)} {...props} />
    );
  }

  return (
    <Skeleton className={cn(baseClasses, "rounded-md", className)} {...props} />
  );
}

export { SkeletonEnhanced }
