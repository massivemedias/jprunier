# JPrunier Website - Key Code Snippets

## Quick Reference for Development

### 1. Adding a New Service

Edit `src/data/content.json`:
```json
{
  "id": "new-service",
  "title": "Service Name",
  "description": "Short description",
  "icon": "IconName",  // From Lucide React
  "details": "Detailed description..."
}
```

### 2. Adding a Testimonial

Edit `src/data/testimonials.json`:
```json
{
  "id": 4,
  "author": "Name",
  "title": "Job Title",
  "company": "Company Name",
  "text": "Testimonial text here",
  "avatar": "https://example.com/avatar.jpg"
}
```

### 3. Adding News Article

Edit `src/data/news.json`:
```json
{
  "id": 5,
  "title": "Article Title",
  "excerpt": "Short excerpt",
  "date": "2024-03-10",
  "category": "Category Name",
  "author": "Author Name",
  "content": "Full article content..."
}
```

### 4. Changing Colors

Edit `src/styles/global.css`:
```css
:root {
  --primary-dark: #NEW_COLOR;
  --accent-violet: #NEW_COLOR;
  --gray-light: #NEW_COLOR;
  /* ... etc */
}
```

### 5. Creating a New Page

Create `src/pages/NewPage.jsx`:
```jsx
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import './NewPage.css';

export default function NewPage() {
  return (
    <>
      <Hero
        title="Page Title"
        subtitle="Page subtitle"
      />
      
      <section className="section">
        <div className="container">
          <h2>Content Here</h2>
        </div>
      </section>
    </>
  );
}
```

Then add route in `src/App.jsx`:
```jsx
<Route path="/newpage" element={<NewPage />} />
```

### 6. Available Lucide React Icons

```jsx
import { Code, Lightbulb, Settings, Zap, Mail, Phone, MapPin, Menu, X, Star, Calendar, User, Tag } from 'lucide-react';

// Use in components:
<Code size={40} />
```

### 7. Using Framer Motion Animations

Hover effect on cards:
```jsx
<motion.div
  whileHover={{ y: -5 }}
  transition={{ duration: 0.3 }}
>
  Card content
</motion.div>
```

Scroll-triggered animation:
```jsx
<motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-100px' }}
>
  Content animates when scrolled into view
</motion.div>
```

### 8. Container & Grid Utilities

```jsx
// Full-width container with max-width
<div className="container">
  {/* max-width: 1400px */}
</div>

// 2-column responsive grid
<div className="grid grid-2">
  {/* auto-fit columns */}
</div>

// 3-column responsive grid
<div className="grid grid-3">
  {/* auto-fit columns */}
</div>
```

### 9. Button Styles

```jsx
// Primary button
<button className="btn btn-primary">
  Click me
</button>

// Secondary button
<button className="btn btn-secondary">
  Click me
</button>
```

### 10. Spacing & Margin Classes

```jsx
// Margin top
<div className="mt-md">Content</div>
<div className="mt-lg">Content</div>
<div className="mt-2xl">Content</div>

// Margin bottom
<div className="mb-md">Content</div>
<div className="mb-lg">Content</div>
<div className="mb-2xl">Content</div>
```

### 11. Text Utilities

```jsx
// Center text
<h2 className="text-center">Centered</h2>

// Muted/secondary text
<p className="text-muted">Secondary text</p>

// Section title
<div className="section-title">
  <h2>Main Title</h2>
  <p className="section-subtitle">Subtitle</p>
</div>
```

### 12. Contact Form Handling

```jsx
const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
  company: '',
  message: '',
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value,
  }));
};

const handleSubmit = (e) => {
  e.preventDefault();
  // Send formData to backend
  console.log(formData);
};
```

### 13. Responsive Design Pattern

```css
/* Desktop first, then mobile override */
.element {
  font-size: var(--font-size-2xl);
  display: grid;
  grid-template-columns: 1fr 1fr;
}

@media (max-width: 768px) {
  .element {
    font-size: var(--font-size-lg);
    grid-template-columns: 1fr;
  }
}
```

### 14. Hero Background Image Pattern

```jsx
<section
  className="hero"
  style={{
    backgroundImage: backgroundImage 
      ? `url(${backgroundImage})` 
      : undefined
  }}
>
  {/* Hero overlay and content */}
</section>
```

### 15. Dynamic Icon from String

```jsx
import * as Icons from 'lucide-react';

const IconComponent = Icons[iconName];

return <IconComponent size={40} />;
```

### 16. Smooth Scroll Navigation

```jsx
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

<button onClick={() => navigate('/contact')}>
  Go to Contact
</button>
```

### 17. Date Formatting

```jsx
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

{formatDate('2024-03-10')} // March 10, 2024
```

### 18. Mobile Menu Toggle

```jsx
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

const toggleMobileMenu = () => {
  setMobileMenuOpen(!mobileMenuOpen);
};

<button onClick={toggleMobileMenu}>
  {mobileMenuOpen ? <X /> : <Menu />}
</button>

<nav className={`nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
  {/* Navigation items */}
</nav>
```

### 19. CSS Variable Usage

```css
/* Define */
:root {
  --primary-color: #102136;
  --spacing-lg: 1.5rem;
}

/* Use */
.element {
  background-color: var(--primary-color);
  padding: var(--spacing-lg);
}
```

### 20. Animation Variables

```css
:root {
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);
}

.element {
  transition: all var(--transition-base);
}

.element:hover {
  transform: translateY(-5px);
}
```

---

## Common Tasks

### Update All Heading Colors
Edit `src/styles/global.css`:
```css
h1, h2, h3, h4, h5, h6 {
  color: var(--new-color);
}
```

### Add Margin to All Section Titles
Edit `src/styles/global.css`:
```css
.section-title {
  margin-bottom: var(--spacing-3xl);
}
```

### Disable Mobile Menu Animation
Remove or modify in `src/components/Header.css`:
```css
.nav {
  transition: max-height var(--transition-base);
}
```

### Change Button Hover Color
Edit `src/styles/global.css`:
```css
.btn-primary:hover {
  background-color: var(--new-hover-color);
}
```

### Increase Card Shadow on Hover
Edit component CSS file:
```css
.card:hover {
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
}
```

---

For more examples, check the actual component files in `src/components/` and `src/pages/`.
