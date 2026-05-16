# Development Guide & Best Practices

## Getting Started with Development

### 1. Setting Up Your Development Environment

#### Prerequisites
- Node.js v16 or higher
- npm or yarn
- Git
- Code editor (VS Code recommended)
- Firebase account
- API backend running locally or deployed

#### Initial Setup
```bash
# Clone repository
git clone https://github.com/MSabbirHossen/Digital-Life-Lessons-Client-.git
cd client

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev
```

### 2. Project Configuration

#### Environment Variables
Edit `.env.local` with your configuration:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api
VITE_API_TIMEOUT=30000

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Feature Flags
VITE_DEBUG=false
VITE_ENABLE_ANALYTICS=true
```

## Development Workflow

### Component Development

#### Creating a New Component

1. **Create Component File**
```bash
touch src/components/MyComponent.jsx
```

2. **Component Template**
```jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const MyComponent = ({ prop1, prop2 }) => {
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Initialization logic
  }, []);

  const handleAction = async () => {
    setLoading(true);
    try {
      // Action logic
      toast.success('Success message');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      {/* Component JSX */}
    </div>
  );
};

export default MyComponent;
```

#### Component Best Practices
- Keep components small and focused (single responsibility)
- Use destructuring for props
- Implement proper error handling
- Add loading states for async operations
- Use React hooks for state management
- Add PropTypes or TypeScript for type safety
- Write descriptive comments for complex logic

### Page Development

#### Creating a New Page

1. **Create Page File**
```bash
touch src/pages/MyPage.jsx
```

2. **Page Template**
```jsx
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import api from '../services/api';
import { toast } from 'react-toastify';

const MyPage = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get('/endpoint');
      setData(response.data);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Page content */}
      </main>
      <Footer />
    </div>
  );
};

export default MyPage;
```

3. **Add Route to App.jsx**
```jsx
import MyPage from './pages/MyPage';

// In the Routes component
<Route path="/my-page" element={<MyPage />} />
```

## Styling with Tailwind CSS

### Common Patterns

#### Responsive Layout
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Items */}
</div>
```

#### Flexbox Centering
```jsx
<div className="flex items-center justify-center h-screen">
  {/* Content */}
</div>
```

#### Button Styling
```jsx
<button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
  Click me
</button>
```

#### Responsive Text
```jsx
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
  Heading
</h1>
```

## State Management

### Using React Context

#### Accessing Auth Context
```jsx
import { useAuth } from '../context/AuthContext';

const MyComponent = () => {
  const { user, isPremium, logout } = useAuth();

  if (!user) {
    return <div>Not logged in</div>;
  }

  return <div>{user.email}</div>;
};
```

### Local Component State
```jsx
const [formData, setFormData] = useState({
  name: '',
  email: '',
  message: ''
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};
```

## API Integration

### Using the API Service

```jsx
import api from '../services/api';

// GET request
const fetchLessons = async () => {
  try {
    const response = await api.get('/lessons/public');
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error.response?.data);
  }
};

// POST request
const createLesson = async (lessonData) => {
  try {
    const response = await api.post('/lessons', lessonData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// PUT request
const updateLesson = async (id, updates) => {
  const response = await api.put(`/lessons/${id}`, updates);
  return response.data;
};

// DELETE request
const deleteLesson = async (id) => {
  await api.delete(`/lessons/${id}`);
};
```

### Error Handling
```jsx
try {
  const response = await api.get('/endpoint');
  // Success
} catch (error) {
  if (error.response?.status === 404) {
    toast.error('Resource not found');
  } else if (error.response?.status === 401) {
    // Handle unauthorized
  } else {
    toast.error(error.response?.data?.message || 'An error occurred');
  }
}
```

## Custom Hooks

### Using useLessons Hook
```jsx
import { useLessons } from '../hooks/useLessons';

const LessonList = () => {
  const { lessons, loading, search, filter } = useLessons();

  return (
    <>
      <input onChange={(e) => search(e.target.value)} />
      <select onChange={(e) => filter(e.target.value)}>
        <option>All Categories</option>
      </select>
      {lessons.map(lesson => (
        <div key={lesson.id}>{lesson.title}</div>
      ))}
    </>
  );
};
```

### Using useInteractions Hook
```jsx
import { useInteractions } from '../hooks/useInteractions';

const LessonCard = ({ lesson }) => {
  const { isFavorited, toggleFavorite } = useInteractions();

  return (
    <button onClick={toggleFavorite}>
      {isFavorited ? '❤️ Favorited' : '🤍 Favorite'}
    </button>
  );
};
```

## Testing

### Component Testing
```bash
npm run test
```

### Debugging
1. Use React Developer Tools browser extension
2. Add breakpoints in browser DevTools
3. Use `console.log()` for quick debugging
4. Check Network tab for API calls

## Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build Locally
```bash
npm run preview
```

### Deployment Platforms
- **Vercel**: Recommended for React apps
- **Netlify**: Simple drag-and-drop deployment
- **GitHub Pages**: Free hosting for static sites
- **AWS S3 + CloudFront**: Scalable solution

## Performance Tips

### 1. Code Splitting
```jsx
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

<Suspense fallback={<div>Loading...</div>}>
  <HeavyComponent />
</Suspense>
```

### 2. Memoization
```jsx
import { memo } from 'react';

const MyComponent = memo(({ data }) => {
  return <div>{data}</div>;
});
```

### 3. useCallback for Functions
```jsx
import { useCallback } from 'react';

const MyComponent = () => {
  const handleClick = useCallback(() => {
    // Action
  }, [dependencies]);

  return <button onClick={handleClick}>Click</button>;
};
```

## Common Issues & Solutions

### Issue: API calls not working
**Solution**: 
- Check API_URL in .env.local
- Verify backend is running
- Check browser console for errors
- Review CORS configuration

### Issue: Authentication state not persisting
**Solution**:
- Check Firebase configuration
- Verify token storage in localStorage
- Check browser storage in DevTools

### Issue: Tailwind styles not applying
**Solution**:
- Ensure Tailwind is properly configured
- Check class names are spelled correctly
- Run `npm run dev` to restart dev server
- Clear browser cache

## Code Style Guide

### Naming Conventions
- Components: PascalCase (`MyComponent.jsx`)
- Functions/variables: camelCase (`myFunction`, `myVariable`)
- Constants: UPPER_SNAKE_CASE (`MAX_ITEMS`)
- Files: kebab-case or match component name

### Formatting
- Use 2-space indentation
- Keep lines under 100 characters
- Use semicolons consistently
- Use single quotes for strings

### Comments
```jsx
// Use single-line comments for brief notes
/*
 * Use multi-line comments for
 * longer explanations
 */
```

## Git Workflow

### Creating a Feature Branch
```bash
git checkout -b feature/my-feature
```

### Committing Changes
```bash
git add .
git commit -m "feat: add my new feature"
```

### Push and Create PR
```bash
git push origin feature/my-feature
```

## Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Firebase Docs](https://firebase.google.com/docs)
- [Axios Documentation](https://axios-http.com)

---

**Last Updated**: May 16, 2026
