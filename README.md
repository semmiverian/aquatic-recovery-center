# Aquatic Recovery Center - Marketing Website

> **Where Water Heals** - A stunning, high-performance marketing website for aquatic therapy and recovery services.

## 🌊 Overview

This is a modern, responsive marketing website designed to showcase the Aquatic Recovery Center's services, technology, and facilities. The website is optimized for conversion, user engagement, and performance.

## ✨ Features

### 📱 Responsive Design
- Fully responsive across all devices (mobile, tablet, desktop)
- Mobile-first approach for optimal performance
- Touch-friendly navigation and interactions

### 🎯 Sections

1. **Hero Section**
   - Autoplay promotional video background
   - Compelling headline and call-to-action
   - Smooth scroll indicator

2. **Technology Section**
   - Four advanced equipment showcases:
     - Static Swimming Pool
     - Underwater Treadmill
     - Underwater Bike
     - Hot & Cold Pool
   - Custom SVG illustrations
   - Detailed features and benefits

3. **Healthy Bistro**
   - Nutritional offerings
   - Sample menu highlights
   - Health-focused meal descriptions

4. **Blog/Insights Section**
   - Latest articles and success stories
   - Categorized content
   - Reading time estimates

5. **Schedule Section**
   - Interactive timetable
   - Session availability indicators
   - Booking call-to-action

6. **Footer**
   - Social media links
   - Newsletter subscription
   - Contact information
   - Quick navigation

### 🎨 Design

- **Color Scheme** (extracted from logo):
  - Primary Green: `#7FB539`
  - Primary Blue: `#0066B3`
  - Accent Teal: `#4ECDC4`
  - Accent Coral: `#FF6B6B`

- **Typography**:
  - Headings: Playfair Display (serif)
  - Body: Poppins (sans-serif)

### ⚡ Performance Optimizations

#### KPI-Focused Features:

1. **Bounce Rate & Session Duration**
   - Engaging content with smooth animations
   - Interactive elements and hover effects
   - Clear call-to-action buttons
   - Compelling hero section with video
   - Exit intent detection

2. **Page Load Time**
   - Optimized CSS and JavaScript
   - Video preloading
   - Lazy loading for images
   - Debounced scroll events
   - Intersection Observer API for animations
   - Reduced repaints and reflows

3. **New vs. Returning Visitors**
   - Session tracking
   - User engagement metrics
   - Newsletter subscription
   - Social media integration

4. **Pages per Visit**
   - Smooth scroll navigation
   - Internal linking strategy
   - Sticky navigation bar
   - Back-to-top button
   - Multiple CTAs throughout

### 📊 Analytics Ready

Built-in tracking for:
- CTA button clicks
- Blog card interactions
- Session duration
- Scroll depth
- Page performance metrics
- User engagement rate

### ♿ Accessibility

- ARIA labels for interactive elements
- Keyboard navigation support
- Skip to content link
- Semantic HTML structure
- Reduced motion support
- High contrast ratios
- Focus indicators

### 🚀 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with custom properties, Grid, Flexbox
- **JavaScript (ES6+)**: Vanilla JS for optimal performance
- **SVG**: Custom illustrations and icons
- **Web APIs**:
  - Intersection Observer
  - Performance API
  - Service Worker (ready for PWA)

## 📁 File Structure

```
aquatic-recovery-center/
├── index.html           # Main HTML file
├── styles.css          # Stylesheet with all styling
├── script.js           # JavaScript for interactions
├── logo.png            # Company logo
├── promotional_video.mp4 # Hero section video
└── README.md           # Documentation
```

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Setup & Deployment

1. **Replace Placeholder Video**:
   ⚠️ **IMPORTANT**: The current `promotional_video.mp4` is a placeholder file. You need to replace it with your actual promotional video.
   - Replace `promotional_video.mp4` with your real video file
   - Recommended format: MP4 (H.264 codec)
   - Recommended size: Keep under 10MB for optimal loading
   - Until you upload a real video, a beautiful animated gradient background will display

2. **Local Development**:
   Simply open `index.html` in a web browser, or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx http-server
   ```

3. **Production Deployment**:
   - Upload all files to your web hosting service
   - Replace the video file with your actual promotional video
   - Ensure video file is properly configured for streaming
   - Configure CDN for optimal asset delivery (recommended)

## 📈 Performance Metrics

Target KPIs:
- Page Load Time: < 3 seconds
- First Contentful Paint: < 1.5 seconds
- Time to Interactive: < 3.5 seconds
- Bounce Rate: < 40%
- Average Session Duration: > 2 minutes

## 🎨 Customization

### Updating Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-green: #7FB539;
    --primary-blue: #0066B3;
    /* ... */
}
```

### Updating Content
- Edit text directly in `index.html`
- Replace `promotional_video.mp4` with your video
- Replace `logo.png` with your logo

### Analytics Integration
Uncomment and configure analytics tracking in `script.js`:
```javascript
// Example: Google Analytics
gtag('event', 'cta_click', { 'button_text': buttonText });
```

## 📞 Contact Information

Update footer contact details in `index.html`:
- Address
- Phone number
- Email
- Social media links
- Operating hours

## 🔐 Security

- No external dependencies for core functionality
- HTTPS recommended for production
- Content Security Policy ready
- XSS protection through modern browser defaults

## 📝 License

© 2025 Aquatic Recovery Center. All rights reserved.

## 🙏 Credits

Designed and developed with focus on:
- User experience
- Performance
- Accessibility
- Conversion optimization

---

**Built with 💙 and 💚 - Where Water Heals**
