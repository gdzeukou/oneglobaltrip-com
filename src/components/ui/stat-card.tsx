import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  change?: number;
  className?: string;
}

const StatCard = ({ icon: Icon, label, value, change, className }: StatCardProps) => {
  return (
    <div className={cn("bg-card p-6 rounded-2xl border premium-shadow smooth-transition hover:scale-105", className)}>
      <div className="flex items-center justify-between mb-2">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        {change !== undefined && (
          <span className={cn(
            "text-xs font-medium",
            change >= 0 ? "text-green-600" : "text-red-600"
          )}>
            {change >= 0 ? '+' : ''}{change}%
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-foreground">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
};

export { StatCard };
