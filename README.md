# Digital Life Lessons - Client Application

A modern, responsive React-based web application for discovering, creating, and sharing educational lessons online. Built with Vite, Tailwind CSS, and Firebase.

## 🌟 Features

### For Students

- 🔍 **Browse & Search**: Discover lessons by category, difficulty, and rating
- 📚 **Learn**: Access detailed lesson content with materials and resources
- ⭐ **Favorites**: Bookmark your favorite lessons for quick access
- 💬 **Community**: Engage with other learners through comments and Q&A
- 📊 **Progress Tracking**: Monitor your learning journey and achievements
- 🎓 **Premium Access**: Unlock exclusive premium lessons with subscription

### For Instructors

- ✍️ **Create**: Build rich lessons with multimedia content
- 📈 **Analytics**: Track student engagement and lesson performance
- 💰 **Monetize**: Set pricing for premium lessons and earn revenue
- 🗂️ **Manage**: Organize and update your lesson library
- 📱 **Responsive**: Your lessons look great on all devices

### For Administrators

- 👥 **User Management**: Manage user accounts and permissions
- 📋 **Content Moderation**: Review and approve lesson content
- 📢 **Reports**: Handle user reports and maintain platform quality
- 📊 **Analytics**: View platform statistics and insights
- ⚙️ **Controls**: Full platform administration capabilities

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/MSabbirHossen/Digital-Life-Lessons-Client-.git
cd client
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment**
   Create a `.env.local` file based on `.env.example`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. **Start development server**

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📦 Build

### Development Build

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

## 📁 Project Structure

```
client/
├── src/
│   ├── components/       # Reusable React components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── LessonCard.jsx
│   │   └── PrivateRoute.jsx
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── PublicLessons.jsx
│   │   ├── LessonDetailsPage.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── AdminDashboardPage.jsx
│   │   └── ... (more pages)
│   ├── context/         # Context API for state management
│   │   └── AuthContext.jsx
│   ├── hooks/           # Custom React hooks
│   │   ├── useLessons.js
│   │   └── useInteractions.js
│   ├── services/        # API service layer
│   │   └── api.js
│   ├── config/          # Configuration files
│   │   └── firebase.js
│   ├── styles/          # Global styles
│   │   └── index.css
│   ├── App.jsx          # Root component
│   └── main.jsx         # Entry point
├── public/              # Static assets
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
└── package.json         # Dependencies and scripts
```

## 🔧 Technology Stack

### Frontend Framework

- **React** (v18.2.0) - UI library
- **Vite** (v4.3.4) - Build tool and dev server
- **React Router DOM** (v6.11.0) - Client-side routing

### Styling

- **Tailwind CSS** (v3.3.2) - Utility-first CSS framework
- **PostCSS** (v8.4.24) - CSS processing
- **Autoprefixer** (v10.4.14) - Browser compatibility

### Authentication & Database

- **Firebase** (v9.23.0) - Authentication and real-time database
- **Firebase Admin SDK** - Server-side authentication (backend)

### HTTP & API

- **Axios** (v1.4.0) - HTTP client for API requests

### Payment Processing

- **Stripe** (v12.1.1) - Payment integration (backend)

### UI Components & Effects

- **React Toastify** (v9.1.3) - Toast notifications
- **SweetAlert2** (v11.7.3) - Beautiful modals and alerts
- **Lottie React** (v2.4.0) - Animated graphics
- **React Share** (v4.4.1) - Social media sharing buttons

## 🔐 Security Features

- ✅ Protected routes for authenticated users
- ✅ Admin-only route protection
- ✅ Secure token-based authentication
- ✅ CORS configuration for API safety
- ✅ Input validation and sanitization
- ✅ Environment variable protection

## 📱 Responsive Design

- Mobile-first approach
- Optimized for all screen sizes:
  - 📱 Mobile (< 640px)
  - 📱 Tablet (640px - 1024px)
  - 💻 Desktop (> 1024px)
- Touch-friendly UI elements
- Accessible navigation

## 🎨 Theming

Customize the appearance through:

- **Tailwind Config**: `tailwind.config.js`
- **CSS Variables**: `src/styles/index.css`
- **Color Scheme**: Primary and secondary brand colors
- **Fonts**: Customizable typography scale

## 🔄 API Integration

The application communicates with a Node.js/Express backend for:

- User authentication and authorization
- Lesson CRUD operations
- User profile management
- Payment processing (Stripe)
- Admin operations
- Report handling

**Backend Repository**: [Digital-Life-Lessons-Server](https://github.com/MSabbirHossen/Digital-Life-Lessons)

## 🚦 State Management

- **React Context API** for authentication state
- **Local component state** for UI interactions
- **Custom hooks** for reusable logic

## 📊 Performance Optimizations

- Code splitting and lazy loading
- Component memoization
- Efficient re-rendering
- Image optimization
- Caching strategies

## 🐛 Debugging

### Development Tools

- React Developer Tools browser extension
- Vite debugging in browser DevTools
- Console error logging

### Environment Variables

Create `.env.development.local` for development:

```env
VITE_DEBUG=true
VITE_API_BASE_URL=http://localhost:5000/api
```

## 📝 Linting

```bash
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Support

For issues and questions, please open an issue on GitHub or contact the development team.

## 🙏 Acknowledgments

- Firebase for real-time database and authentication
- Tailwind CSS for utility-first styling
- Stripe for payment processing
- The React community for amazing tools and libraries

---

**Last Updated**: May 16, 2026  
**Version**: 1.0.0
