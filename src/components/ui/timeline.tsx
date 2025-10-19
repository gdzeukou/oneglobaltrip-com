import * as React from "react";
import { cn } from "@/lib/utils";

interface TimelineItem {
  time?: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  status?: 'completed' | 'current' | 'upcoming';
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

const Timeline = ({ items, className }: TimelineProps) => {
  return (
    <div className={cn("space-y-6", className)}>
      {items.map((item, index) => (
        <div key={index} className="flex gap-4 group">
          {/* Timeline Line & Dot */}
          <div className="flex flex-col items-center">
            <div className={cn(
              "h-8 w-8 rounded-full border-2 flex items-center justify-center shrink-0 smooth-transition",
              item.status === 'completed' && "bg-primary border-primary text-white",
              item.status === 'current' && "bg-gold border-gold text-white scale-110",
              item.status === 'upcoming' && "bg-background border-border text-muted-foreground"
            )}>
              {item.icon || (
                <div className="h-2 w-2 rounded-full bg-current" />
              )}
            </div>
            {index < items.length - 1 && (
              <div className={cn(
                "w-0.5 flex-1 min-h-[2rem]",
                item.status === 'completed' ? "bg-primary" : "bg-border"
              )} />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 pb-6">
            <div className="flex items-baseline gap-3 mb-1">
              {item.time && (
                <span className="text-sm font-medium text-primary">{item.time}</span>
              )}
              <h4 className="font-semibold text-foreground">{item.title}</h4>
            </div>
            {item.description && (
              <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export { Timeline, type TimelineItem };
