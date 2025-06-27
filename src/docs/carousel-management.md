
# Hero Carousel Management Guide

## Overview
The hero carousel is a dynamic, full-width image slider that appears at the top of the homepage. It showcases key travel destinations with compelling visuals and call-to-action buttons.

## Image Specifications

### Required Dimensions
- **Minimum width:** 1920px
- **Aspect ratio:** 16:9 (recommended: 1920×1080)
- **File size:** ≤ 300KB each
- **Format:** WebP preferred, JPEG fallback supported

### Image Quality Guidelines
- Use high-resolution, professional travel photography
- Ensure images are bright and vibrant
- Avoid overly busy compositions (text overlay area should be clear)
- Test images on both desktop and mobile devices

## Content Requirements

### For Each Slide
1. **Destination Name** - Bold, clear destination (e.g., "Paris", "Tokyo")
2. **Teaser Text** - One compelling line (e.g., "See Paris in Bloom")
3. **CTA Button Text** - Action-oriented (usually "Explore Deals")
4. **CTA Link** - Direct link to relevant packages or visa pages
5. **Alt Text** - Descriptive text for accessibility compliance

### Content Best Practices
- Keep destination names short and recognizable
- Use emotional, action-oriented teaser text
- Ensure CTA links lead to relevant, working pages
- Write descriptive alt text for screen readers

## Technical Features

### Performance Optimizations
- Lazy loading for off-screen images
- WebP format with JPEG fallback
- Responsive image sizing (srcset)
- Optimized for Core Web Vitals (LCP < 2.5s)

### Accessibility Features
- ARIA labels and live regions
- Keyboard navigation support
- Focus management
- Screen reader friendly
- Pause on hover/focus

### User Interactions
- Auto-play (4-second intervals)
- Manual navigation (arrows + dots)
- Touch/swipe support on mobile
- Pause on hover (desktop)
- Keyboard controls (arrow keys)

## CMS Management

### Adding New Slides
1. Navigate to Admin > Carousel Management
2. Click "Add Slide"
3. Fill in all required fields:
   - Image URL (Unsplash or uploaded image)
   - Destination name
   - Teaser text
   - CTA button text
   - CTA link destination
   - Alt text for accessibility
4. Save the slide

### Editing Existing Slides
1. Find the slide in the management interface
2. Click "Edit" button
3. Modify any fields as needed
4. Save changes

### Reordering Slides
- Use up/down arrows to change slide order
- Changes take effect immediately
- First slide loads by default on page visit

### Deleting Slides
- Click the trash icon next to any slide
- Confirm deletion
- Minimum of 3 slides recommended for best UX

## Localization Support

### Text Content
All text fields support multiple languages:
- Destination names can be localized
- Teaser text can be translated
- CTA button text can be customized per locale

### Implementation
- Text content stored in CMS with language tags
- Automatic fallback to default language
- Easy translation management interface

## Fallback Behavior

### JavaScript Disabled
- Shows first slide as static hero image
- Maintains destination name and CTA button
- Ensures core functionality without JS

### Slow Connections
- Progressive image loading
- Loading indicators
- Graceful degradation of animations

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Android Chrome)
- Graceful degradation for older browsers
- Touch/swipe optimized for mobile devices

## Monitoring & Analytics

### Performance Metrics
- Monitor LCP (Largest Contentful Paint)
- Track carousel interaction rates
- Measure conversion from CTA clicks

### Recommended Monitoring
- Click-through rates by slide
- User engagement time
- Mobile vs desktop performance
- Image load times

## Troubleshooting

### Common Issues
1. **Images not loading:** Check URL validity and CORS settings
2. **Slow performance:** Optimize image sizes and formats
3. **Auto-play not working:** Check browser autoplay policies
4. **Touch controls not responsive:** Test swipe sensitivity settings

### Performance Tips
- Keep total number of slides under 10 for best performance
- Optimize images before uploading
- Test on various devices and connections
- Monitor Core Web Vitals regularly
