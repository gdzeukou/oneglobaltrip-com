import React, { useEffect, useRef } from 'react';
import FastImage from '@/components/ui/fast-image';
import type { CarouselSlide } from '@/data/heroSlides';

interface HeroMediaProps {
  slide: CarouselSlide;
  active: boolean;
  priority?: boolean;
}

const HeroMedia: React.FC<HeroMediaProps> = ({ slide, active, priority }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasVideo = Boolean(slide.videoWebm || slide.videoMp4);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (active) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [active]);

  return (
    <figure className="absolute inset-0">
      {hasVideo ? (
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
          poster={slide.poster}
          aria-label={slide.alt}
        >
          {slide.videoWebm && <source src={slide.videoWebm} type="video/webm" />}
          {slide.videoMp4 && <source src={slide.videoMp4} type="video/mp4" />}
        </video>
      ) : (
        <FastImage
          src={slide.image}
          alt={slide.alt}
          className="w-full h-full"
          priority={priority}
          sizes="100vw"
          aspectRatio="16/9"
        />
      )}
    </figure>
  );
};

export default HeroMedia;
