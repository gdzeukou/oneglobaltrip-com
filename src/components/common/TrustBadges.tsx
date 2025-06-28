
import { Star, Shield, Clock } from 'lucide-react';

interface TrustBadge {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
}

interface TrustBadgesProps {
  badges?: TrustBadge[];
  className?: string;
}

const TrustBadges = ({ 
  badges = [
    {
      icon: Star,
      title: '⭐ 4.9/5 on Trustpilot',
      subtitle: 'Thousands of happy travelers'
    },
    {
      icon: Shield,
      title: '2,800+ visas approved',
      subtitle: '99% success rate'
    },
    {
      icon: Clock,
      title: 'AI-powered document checker',
      subtitle: 'Reduce errors, save time'
    }
  ],
  className = ''
}: TrustBadgesProps) => {
  return (
    <section className={`py-12 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {badges.map((badge, index) => (
            <div key={index} className="flex flex-col items-center">
              <badge.icon className="h-12 w-12 text-yellow-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">{badge.title}</h3>
              <p className="text-gray-600">{badge.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
