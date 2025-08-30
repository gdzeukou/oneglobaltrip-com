import React, { useState } from 'react';
import { Star, MapPin, Wifi, Car, Utensils, Dumbbell, Users, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export interface HotelResult {
  id: string;
  name: string;
  images: string[];
  rating: number;
  reviewCount: number;
  location: {
    address: string;
    city: string;
    distance: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  amenities: string[];
  rooms: Array<{
    type: string;
    bedType: string;
    occupancy: number;
    pricePerNight: number;
    totalPrice: number;
    currency: string;
    cancellation: string;
  }>;
  description?: string;
  checkIn: string;
  checkOut: string;
  nights: number;
}

interface HotelResultCardProps {
  hotel: HotelResult;
  onSelect: (hotel: HotelResult) => void;
  onViewDetails?: (hotel: HotelResult) => void;
  onCompare?: (hotel: HotelResult) => void;
  isSelected?: boolean;
  isComparing?: boolean;
}

const HotelResultCard: React.FC<HotelResultCardProps> = ({
  hotel,
  onSelect,
  onViewDetails,
  onCompare,
  isSelected = false,
  isComparing = false
}) => {
  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const getStarRating = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  const getAmenityIcon = (amenity: string) => {
    const amenityLower = amenity.toLowerCase();
    if (amenityLower.includes('wifi') || amenityLower.includes('internet')) return <Wifi className="w-4 h-4" />;
    if (amenityLower.includes('parking')) return <Car className="w-4 h-4" />;
    if (amenityLower.includes('restaurant') || amenityLower.includes('dining')) return <Utensils className="w-4 h-4" />;
    if (amenityLower.includes('gym') || amenityLower.includes('fitness')) return <Dumbbell className="w-4 h-4" />;
    return null;
  };

  const bestRoom = hotel.rooms.reduce((min, room) => 
    room.pricePerNight < min.pricePerNight ? room : min
  );

  return (
    <Card className={`group hover:shadow-elegant transition-all duration-300 ${
      isSelected ? 'ring-2 ring-primary shadow-glow' : ''
    }`}>
      <CardContent className="p-0">
        {/* Image Carousel */}
        <div className="relative">
          <Carousel className="w-full">
            <CarouselContent>
              {hotel.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={image}
                      alt={`${hotel.name} - Image ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {hotel.images.length > 1 && (
              <>
                <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
                <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
              </>
            )}
          </Carousel>

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm rounded-lg px-2 py-1">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{hotel.rating}</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-bold text-lg text-foreground mb-1">{hotel.name}</h3>
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex items-center space-x-1">
                  {getStarRating(hotel.rating)}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({hotel.reviewCount} reviews)
                </span>
              </div>
              <div className="flex items-start space-x-1 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <div>{hotel.location.address}</div>
                  <div className="text-xs">{hotel.location.distance} from center</div>
                </div>
              </div>
            </div>

            <div className="text-right ml-4">
              <div className="text-2xl font-bold text-primary">
                {formatPrice(bestRoom.pricePerNight, bestRoom.currency)}
              </div>
              <div className="text-sm text-muted-foreground">per night</div>
              <div className="text-xs text-muted-foreground">
                {formatPrice(bestRoom.totalPrice, bestRoom.currency)} total
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {hotel.amenities.slice(0, 6).map((amenity, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  <span className="flex items-center space-x-1">
                    {getAmenityIcon(amenity)}
                    <span>{amenity}</span>
                  </span>
                </Badge>
              ))}
              {hotel.amenities.length > 6 && (
                <Badge variant="outline" className="text-xs">
                  +{hotel.amenities.length - 6} more
                </Badge>
              )}
            </div>
          </div>

          {/* Room Details */}
          <div className="mb-4 p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>{bestRoom.occupancy} guests</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>{hotel.nights} nights</span>
                </div>
              </div>
              <div className="text-green-600 font-medium">
                {bestRoom.cancellation}
              </div>
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {bestRoom.type} • {bestRoom.bedType}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button 
              onClick={() => onSelect(hotel)}
              className="flex-1"
              variant={isSelected ? "default" : "outline"}
            >
              {isSelected ? 'Selected' : 'Select Hotel'}
            </Button>
            
            {onViewDetails && (
              <Button 
                onClick={() => onViewDetails(hotel)}
                variant="ghost"
                size="sm"
              >
                Details
              </Button>
            )}

            {onCompare && (
              <Button 
                onClick={() => onCompare(hotel)}
                variant="ghost"
                size="sm"
                className={isComparing ? 'bg-secondary' : ''}
              >
                {isComparing ? 'Remove' : 'Compare'}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HotelResultCard;