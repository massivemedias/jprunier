# JPrunier Website - Setup & Development Guide

## Quick Start

### Prerequisites
- Node.js 16+ and npm installed
- All dependencies are already installed (react, react-router-dom, framer-motion, lucide-react)

### Running the Development Server

```bash
npm run dev
```

This will start the Vite development server at `http://localhost:5173/`

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Preview Production Build Locally

```bash
npm run preview
```

## Project Overview

This is a complete, production-ready website for JPrunier Inc. built with:
- **React 19** for UI components
- **Vite** for fast bundling and development
- **React Router v6** for page navigation
- **Framer Motion** for smooth animations
- **Lucide React** for icons
- **Pure CSS** with CSS variables (no Tailwind)

## What's Included

### 5 Complete Pages
1. **Home** - Landing page with services, partners, and sectors
2. **About** - Company story, values, and testimonials
3. **Services** - Detailed service offerings and expertise
4. **Contact** - Contact form and office locations
5. **News** - News feed and newsletter signup

### Reusable Components
- `Header` - Sticky navigation with mobile menu
- `Footer` - Footer with CTA and contact info
- `Hero` - Full-width hero sections
- `ServiceCard` - Service display cards
- `TestimonialCard` - Client testimonials
- `ScrollToTop` - Navigation utility

### Data Files (JSON)
- `content.json` - Main site content (easily editable)
- `testimonials.json` - Client testimonials
- `news.json` - News articles

### Styling
- `global.css` - Design system with CSS variables
- Component-specific CSS files for scoped styling

## Design System

The site uses a carefully crafted color palette optimized for tech companies:

```css
Primary Dark:    #102136 (deep navy blue)
Accent Violet:   #7456f1 (vibrant purple)
Light Gray:      #E7EBEE (off-white)
Dark Gray:       #4d5d6d (muted gray)
```

All colors, spacing, typography, and transitions are defined as CSS variables in `src/styles/global.css`.

## File Organization

```
src/
├── components/        # Reusable components
├── pages/            # Page components
├── data/             # JSON content files
├── styles/           # Global CSS and design system
├── App.jsx           # Main router setup
└── main.jsx          # React entry point
```

## Customizing Content

### Update Site Text
Edit `/src/data/content.json` to change:
- Company name, description, contact info
- Hero section titles
- Service descriptions
- Sector information
- Partner names

### Update Testimonials
Edit `/src/data/testimonials.json` to add/modify:
- Client names and titles
- Testimonial quotes
- Avatar image URLs

### Update News
Edit `/src/data/news.json` to add/modify:
- News article titles and content
- Publication dates
- Categories and authors

### Update Images
Currently using placeholder images from:
`https://jprunier.com/wp-content/uploads/`

Update image URLs in:
- Each page's Hero component (Home.jsx, About.jsx, etc.)
- `src/data/testimonials.json` for client avatars

## Key Features

### Responsive Design
- Mobile-first approach
- Breakpoint at 768px
- All layouts tested on mobile, tablet, and desktop

### Animations
- Smooth page transitions
- Card hover effects
- Staggered animations on scroll
- GPU-accelerated transitions
- Non-blocking animations for performance

### Accessibility
- Semantic HTML
- Proper heading hierarchy
- Form labels and descriptions
- Icon labels and alt text

### Performance
- CSS-in-JS free (pure CSS)
- Optimized Vite build
- ~276KB JS + ~4KB CSS gzipped
- Fast initial load and navigation

## Color Guide for Customization

All colors can be updated in `src/styles/global.css`:

```css
:root {
  --primary-dark: #102136;        /* Main background */
  --accent-violet: #7456f1;       /* Buttons, highlights */
  --gray-light: #E7EBEE;          /* Text on dark */
  --gray-dark: #4d5d6d;           /* Secondary text */
  --surface: #1a2b3d;             /* Card backgrounds */
}
```

Change these variables once and the entire site updates!

## Component Examples

### Using Hero Component
```jsx
<Hero
  title="Page Title"
  subtitle="Page subtitle"
  backgroundImage="https://example.com/image.jpg"
  cta="Call to Action"
  onCtaClick={() => navigate('/contact')}
/>
```

### Using ServiceCard Component
```jsx
<ServiceCard
  title="Service Name"
  description="Short description"
  icon="Code"  // Lucide React icon name
  expanded={hoveredService === 'id'}
  onMouseEnter={() => setHoveredService('id')}
  onMouseLeave={() => setHoveredService(null)}
/>
```

### Using TestimonialCard Component
```jsx
<TestimonialCard
  author="John Doe"
  title="CEO"
  company="Acme Corp"
  text="Amazing service!"
  avatar="https://example.com/avatar.jpg"
/>
```

## Deploying to Production

### Build the Project
```bash
npm run build
```

### Deploy the `dist/` folder to your hosting:
- Vercel: `vercel deploy dist/`
- Netlify: Drag and drop `dist/` folder
- Traditional hosting: FTP/SSH the `dist/` contents

### Important: Set up 404 Redirects
Since this is a single-page app with client-side routing, configure your hosting to redirect 404s to `index.html`.

For example in a `_redirects` file (Netlify):
```
/*  /index.html  200
```

## Troubleshooting

### Dev Server Won't Start
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Build Fails
Check that all imports are correct and all files exist:
```bash
npm run build
```

### Page Content Not Updating
Make sure you're editing the JSON files in `src/data/` and reloading the browser.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Performance Tips

1. **Optimize Images**: Replace placeholder images with optimized versions
2. **Code Splitting**: For large features, consider dynamic imports:
   ```jsx
   const NewsPage = lazy(() => import('./pages/News'));
   ```
3. **CDN**: Host images on a CDN for faster loading
4. **Analytics**: Add Google Analytics or similar for tracking

## Future Enhancements

- [ ] Blog system with dynamic posts
- [ ] SEO optimization (meta tags, schema)
- [ ] Analytics integration
- [ ] Contact form backend
- [ ] Multi-language support
- [ ] Dark/light mode toggle
- [ ] Map integration
- [ ] Admin dashboard
- [ ] CMS integration
- [ ] Email newsletter automation

## Getting Help

For issues with:
- **Vite**: https://vitejs.dev/
- **React**: https://react.dev/
- **React Router**: https://reactrouter.com/
- **Framer Motion**: https://www.framer.com/motion/
- **Lucide Icons**: https://lucide.dev/

## File Reference

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main app with routing |
| `src/styles/global.css` | Design system & base styles |
| `src/components/*` | Reusable UI components |
| `src/pages/*` | Full page components |
| `src/data/*.json` | Editable content files |
| `vite.config.js` | Build configuration |
| `package.json` | Project dependencies |
| `index.html` | HTML entry point |

## Next Steps

1. **Customize content**: Update JSON files with real company data
2. **Add real images**: Replace placeholder image URLs
3. **Set up hosting**: Deploy to Vercel, Netlify, or your server
4. **Connect backend**: Set up contact form and newsletter endpoints
5. **Add analytics**: Integrate tracking to monitor user behavior
6. **SEO**: Add meta tags for each page

---

Built with care for JPrunier Inc.
Last updated: March 10, 2024
