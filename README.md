# JPrunier Inc. - AI-AV Integration Website

A complete, production-ready Vite + React website for JPrunier Inc., a leading provider of intelligent audio-visual and AI integration solutions.

## Quick Links

- **Getting Started**: See [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md)
- **Project Overview**: See [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)  
- **File Structure**: See [FILE_STRUCTURE.txt](./FILE_STRUCTURE.txt)
- **Code Examples**: See [CODE_SNIPPETS.md](./CODE_SNIPPETS.md)

## What's Included

### 5 Complete Pages
- **Home** - Services, partners, sectors, CTA
- **About** - Company story, values, testimonials
- **Services** - Service details, Crestron expertise, core capabilities
- **Contact** - Contact form, office locations, map
- **News** - News feed, newsletter signup

### 6 Reusable Components
- Header (sticky nav with mobile menu)
- Footer (CTA, links, contact info)
- Hero (reusable hero sections)
- ServiceCard (service display)
- TestimonialCard (client testimonials)
- ScrollToTop (utility)

### Design System
- Dark tech theme (#102136 primary, #7456f1 accent)
- Fully responsive (mobile-first)
- Smooth animations with Framer Motion
- Pure CSS with CSS variables (no Tailwind)

## Quick Start

### Development
```bash
npm run dev
```
Starts the dev server at http://localhost:5173/

### Production Build
```bash
npm run build
```
Creates optimized build in `dist/` folder

### Preview Build
```bash
npm run preview
```

## Tech Stack

- React 19.2.0
- React Router DOM 6.30.3
- Framer Motion 12.35.2
- Lucide React 0.577.0
- Vite 7.3.1
- Pure CSS with CSS Variables

## Key Features

✓ Fully responsive (mobile to desktop)
✓ Smooth animations and transitions
✓ Contact form with validation
✓ News feed with categories
✓ Client testimonials
✓ Service showcase
✓ Technology partners grid
✓ Industry sectors display
✓ Mobile hamburger menu
✓ SEO ready
✓ Performance optimized

## Project Structure

```
src/
├── components/      # Reusable UI components
├── pages/          # Full page components
├── data/           # JSON content files (editable)
├── styles/         # Design system & global CSS
├── App.jsx         # Router setup
└── main.jsx        # Entry point
```

## Content Files

All site content is in JSON files for easy updates:

- **src/data/content.json** - Main site content
- **src/data/testimonials.json** - Client testimonials
- **src/data/news.json** - News articles

Edit these files to change site content without touching React code.

## Color Palette

- **Primary Dark**: #102136
- **Accent Violet**: #7456f1
- **Light Gray**: #E7EBEE
- **Dark Gray**: #4d5d6d

All colors are CSS variables in `src/styles/global.css` and can be changed globally.

## Customization

### Change Content
Edit JSON files in `src/data/`

### Change Design
Edit CSS variables in `src/styles/global.css`

### Change Colors
Update CSS variables in `:root` selector

### Add New Pages
Create new file in `src/pages/` and add route in `App.jsx`

### Add New Components
Create new file in `src/components/` and import where needed

## Build Output

- JavaScript: ~276KB gzipped
- CSS: ~4KB gzipped
- Total: ~280KB gzipped
- Build time: ~2 seconds

## Deployment

The `dist/` folder is ready for deployment to:
- Vercel
- Netlify
- GitHub Pages
- Traditional hosting
- Docker

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Documentation

This project includes comprehensive documentation:

1. **SETUP_INSTRUCTIONS.md** - Development guide and deployment instructions
2. **PROJECT_SUMMARY.md** - Complete project overview and architecture
3. **FILE_STRUCTURE.txt** - Directory structure and file descriptions
4. **CODE_SNIPPETS.md** - Quick reference for common development tasks

## Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

## Component Examples

### Hero Section
```jsx
<Hero
  title="Page Title"
  subtitle="Page subtitle"
  backgroundImage="https://example.com/image.jpg"
  cta="Call to Action"
  onCtaClick={() => navigate('/contact')}
/>
```

### Service Card
```jsx
<ServiceCard
  title="Service Name"
  description="Description"
  icon="Code"
/>
```

### Testimonial Card
```jsx
<TestimonialCard
  author="John Doe"
  title="CEO"
  company="Company"
  text="Testimonial text"
  avatar="https://example.com/avatar.jpg"
/>
```

## Next Steps

1. Customize content in `src/data/` JSON files
2. Replace placeholder images with real images
3. Set up backend for contact form
4. Deploy to hosting platform
5. Add analytics and SEO enhancements
6. Connect to CMS for dynamic content

## Performance Notes

- CSS-in-JS free (pure CSS for faster loading)
- Optimized asset sizes
- Fast Vite build and HMR
- GPU-accelerated animations
- Minimal dependencies

## Future Enhancements

- Backend API integration
- CMS connectivity
- Blog system
- Email newsletter
- Multi-language support
- Dark/light mode toggle
- Advanced analytics
- Admin dashboard

## Support & Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

## Version

- **Version**: 1.0.0
- **Status**: Production Ready
- **Created**: March 10, 2024

## License

Built for JPrunier Inc.

---

**Get Started**: Run `npm run dev` to start developing!

For detailed setup instructions, see [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md)
