import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, MessageCircle, UserPlus, Check } from 'lucide-react';
import { PublicProfile } from '@/hooks/usePublicProfile';
import { useConnections } from '@/hooks/useConnections';
import { useNavigate } from 'react-router-dom';

interface TravelerCardProps {
  traveler: PublicProfile & {
    distance_km?: number;
    upcoming_trips?: Array<{
      destination: string;
      start_date: string;
      end_date: string;
    }>;
  };
}

export const TravelerCard = ({ traveler }: TravelerCardProps) => {
  const navigate = useNavigate();
  const { sendConnectionRequest, getConnectionStatus, isSendingRequest } = useConnections();
  const connectionStatus = getConnectionStatus(traveler.user_id);
  
  const [isExpanded, setIsExpanded] = useState(false);

  const handleConnect = () => {
    sendConnectionRequest({ addresseeId: traveler.user_id });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="p-6 hover:shadow-lg smooth-transition">
      <div className="flex items-start gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={traveler.avatar_url} alt={traveler.display_name} />
          <AvatarFallback className="bg-primary/10 text-primary">
            {getInitials(traveler.display_name)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-lg truncate">
              {traveler.display_name}
            </h3>
            {traveler.verified && (
              <Badge variant="secondary" className="bg-gold/20 text-gold">
                ✓ Verified
              </Badge>
            )}
          </div>

          {(traveler.home_city || traveler.home_country) && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
              <MapPin className="h-4 w-4" />
              <span>
                {traveler.home_city}
                {traveler.home_city && traveler.home_country && ', '}
                {traveler.home_country}
              </span>
            </div>
          )}

          {traveler.distance_km && (
            <div className="text-sm text-muted-foreground mb-2">
              📍 {traveler.distance_km} km away
            </div>
          )}

          {traveler.bio && (
            <p className={`text-sm text-muted-foreground ${!isExpanded && 'line-clamp-2'}`}>
              {traveler.bio}
            </p>
          )}

          {traveler.bio && traveler.bio.length > 100 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm text-primary hover:underline mt-1"
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </button>
          )}

          {traveler.travel_interests && traveler.travel_interests.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {traveler.travel_interests.slice(0, 5).map((interest, idx) => (
                <Badge key={idx} variant="outline">
                  {interest}
                </Badge>
              ))}
            </div>
          )}

          {traveler.upcoming_trips && traveler.upcoming_trips.length > 0 && (
            <div className="mt-3 p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 text-sm font-medium mb-2">
                <Calendar className="h-4 w-4" />
                <span>Upcoming Trips</span>
              </div>
              {traveler.upcoming_trips.map((trip, idx) => (
                <div key={idx} className="text-sm text-muted-foreground">
                  ✈️ {trip.destination} - {new Date(trip.start_date).toLocaleDateString()}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        {connectionStatus === 'none' && (
          <Button
            onClick={handleConnect}
            disabled={isSendingRequest}
            className="flex-1"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Connect
          </Button>
        )}
        {connectionStatus === 'pending' && (
          <Button disabled className="flex-1" variant="outline">
            <Check className="h-4 w-4 mr-2" />
            Request Sent
          </Button>
        )}
        {connectionStatus === 'connected' && (
          <Button variant="outline" className="flex-1">
            <MessageCircle className="h-4 w-4 mr-2" />
            Message
          </Button>
        )}
        <Button
          variant="outline"
          onClick={() => navigate(`/discover/profile/${traveler.user_id}`)}
        >
          View Profile
        </Button>
      </div>
    </Card>
  );
};
