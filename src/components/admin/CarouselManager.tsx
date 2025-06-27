
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Move, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CarouselSlide {
  id: string;
  image: string;
  destination: string;
  teaser: string;
  ctaText: string;
  ctaLink: string;
  alt: string;
  order: number;
}

const CarouselManager = () => {
  const { toast } = useToast();
  const [slides, setSlides] = useState<CarouselSlide[]>([]);
  const [editingSlide, setEditingSlide] = useState<CarouselSlide | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddSlide = () => {
    setEditingSlide({
      id: '',
      image: '',
      destination: '',
      teaser: '',
      ctaText: 'Explore Deals',
      ctaLink: '/packages',
      alt: '',
      order: slides.length + 1
    });
    setIsAdding(true);
  };

  const handleSaveSlide = (slide: CarouselSlide) => {
    if (isAdding) {
      const newSlide = { ...slide, id: Date.now().toString() };
      setSlides([...slides, newSlide]);
      setIsAdding(false);
    } else {
      setSlides(slides.map(s => s.id === slide.id ? slide : s));
    }
    setEditingSlide(null);
    toast({
      title: "Slide saved",
      description: "Carousel slide has been updated successfully.",
    });
  };

  const handleDeleteSlide = (slideId: string) => {
    setSlides(slides.filter(s => s.id !== slideId));
    toast({
      title: "Slide deleted",
      description: "Carousel slide has been removed.",
    });
  };

  const moveSlide = (slideId: string, direction: 'up' | 'down') => {
    const slideIndex = slides.findIndex(s => s.id === slideId);
    if (
      (direction === 'up' && slideIndex === 0) ||
      (direction === 'down' && slideIndex === slides.length - 1)
    ) return;

    const newSlides = [...slides];
    const targetIndex = direction === 'up' ? slideIndex - 1 : slideIndex + 1;
    [newSlides[slideIndex], newSlides[targetIndex]] = [newSlides[targetIndex], newSlides[slideIndex]];
    
    setSlides(newSlides);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Carousel Management</h2>
        <Button onClick={handleAddSlide} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Slide
        </Button>
      </div>

      {/* Image Specifications Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Image Specifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-gray-600">
          <p><strong>Recommended dimensions:</strong> 1920px width minimum</p>
          <p><strong>Aspect ratio:</strong> 16:9 (e.g., 1920×1080)</p>
          <p><strong>File size:</strong> ≤ 300KB each</p>
          <p><strong>Format:</strong> WebP preferred, JPEG fallback</p>
          <p><strong>Alt text:</strong> Descriptive text for accessibility</p>
        </CardContent>
      </Card>

      {/* Slides List */}
      <div className="grid gap-4">
        {slides.map((slide, index) => (
          <Card key={slide.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img 
                    src={slide.image} 
                    alt={slide.alt}
                    className="w-16 h-10 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{slide.destination}</h3>
                    <p className="text-sm text-gray-600">{slide.teaser}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => moveSlide(slide.id, 'up')}
                    disabled={index === 0}
                  >
                    ↑
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => moveSlide(slide.id, 'down')}
                    disabled={index === slides.length - 1}
                  >
                    ↓
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingSlide(slide)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteSlide(slide.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Modal */}
      {editingSlide && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>{isAdding ? 'Add New Slide' : 'Edit Slide'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={editingSlide.image}
                  onChange={(e) => setEditingSlide({...editingSlide, image: e.target.value})}
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
              
              <div>
                <Label htmlFor="destination">Destination</Label>
                <Input
                  id="destination"
                  value={editingSlide.destination}
                  onChange={(e) => setEditingSlide({...editingSlide, destination: e.target.value})}
                  placeholder="Paris"
                />
              </div>
              
              <div>
                <Label htmlFor="teaser">Teaser Text</Label>
                <Input
                  id="teaser"
                  value={editingSlide.teaser}
                  onChange={(e) => setEditingSlide({...editingSlide, teaser: e.target.value})}
                  placeholder="See Paris in Bloom"
                />
              </div>
              
              <div>
                <Label htmlFor="ctaText">CTA Button Text</Label>
                <Input
                  id="ctaText"
                  value={editingSlide.ctaText}
                  onChange={(e) => setEditingSlide({...editingSlide, ctaText: e.target.value})}
                  placeholder="Explore Deals"
                />
              </div>
              
              <div>
                <Label htmlFor="ctaLink">CTA Link</Label>
                <Input
                  id="ctaLink"
                  value={editingSlide.ctaLink}
                  onChange={(e) => setEditingSlide({...editingSlide, ctaLink: e.target.value})}
                  placeholder="/packages?destination=paris"
                />
              </div>
              
              <div>
                <Label htmlFor="alt">Alt Text (Accessibility)</Label>
                <Textarea
                  id="alt"
                  value={editingSlide.alt}
                  onChange={(e) => setEditingSlide({...editingSlide, alt: e.target.value})}
                  placeholder="Descriptive text for screen readers"
                  rows={3}
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setEditingSlide(null);
                    setIsAdding(false);
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={() => handleSaveSlide(editingSlide)}>
                  Save Slide
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CarouselManager;
