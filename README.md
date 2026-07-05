# Digital Life Lessons — Client

A modern, responsive React web client for discovering, creating, and sharing educational lessons.

This project is built with Vite, React, Tailwind CSS and uses Firebase for authentication and realtime services. It pairs with the server repository: [Digital-Life-Lessons-Server](https://github.com/MSabbirHossen/Digital-Life-Lessons).

---

## Table of contents

- [Key features](#key-features)
- [Quick start](#quick-start)
- [Environment](#environment)
- [Available scripts](#available-scripts)
- [Project structure](#project-structure)
- [Technology stack](#technology-stack)
- [Security & accessibility](#security--accessibility)
- [API & backend](#api--backend)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## Key features

A few highlights — see the app for the complete experience.

- Students: browse, search, follow lessons, save favorites, comment, track progress, and access premium content.
- Instructors: create rich multimedia lessons, view analytics, manage content, and monetize lessons.
- Administrators: manage users, moderate content, view platform reports, and configure platform settings.
- Responsive, mobile-first UI with accessibility considerations.
- Secure authentication and protected routes powered by Firebase.

---

## Quick start

Prerequisites

- Node.js v16 or newer
- npm or yarn

Clone and run locally

```bash
git clone https://github.com/MSabbirHossen/Digital-Life-Lessons-Client-.git
cd client
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

Production build

```bash
npm run build
npm run preview
```

---

## Environment

Copy the example environment and fill in values from your Firebase and backend configuration:

Create `.env.local` (do not commit)

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Optional development env

```env
VITE_DEBUG=true
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## Available scripts (package.json)

- npm run dev — start development server
- npm run build — create production build
- npm run preview — preview production build locally
- npm run lint — run linters

---

## Project structure

Top-level layout (client/)

```
client/
├── src/
│   ├── components/       # Reusable React components (Navbar, Footer, LessonCard...)
│   ├── pages/            # Route pages (Home, PublicLessons, LessonDetails, Admin...)
│   ├── context/          # React Contexts (AuthContext)
│   ├── hooks/            # Custom hooks (useLessons, useInteractions)
│   ├── services/         # API layer (api.js)
│   ├── config/           # Config files (firebase.js)
│   ├── styles/           # Global styles (index.css)
│   ├── App.jsx
│   └── main.jsx
├── public/               # Static assets
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## Technology stack

Frontend

- React 18
- Vite (dev server & build)
- React Router DOM

Styling & tooling

- Tailwind CSS
- PostCSS, Autoprefixer

Integrations

- Firebase (auth & realtime)
- Axios (HTTP client)
- Stripe (payments handled on the backend)

UI & UX

- React Toastify, SweetAlert2, Lottie, React Share

---

## Security & accessibility

- Protected routes and admin-only sections
- Token-based authentication and CORS configuration
- Input validation and sanitization
- Mobile-first and accessible navigation

---

## API & backend

The client expects a complementary Node.js/Express backend for:

- User authentication and authorization
- Lesson CRUD
- Profile management
- Payment processing (Stripe)
- Admin and reporting endpoints

Backend repository: https://github.com/MSabbirHossen/Digital-Life-Lessons

---

## Contributing

Thank you for contributing! Quick steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "Add feature"`
4. Push your branch: `git push origin feature/your-feature`
5. Open a Pull Request

Please follow the project's linting rules and code style.

---

## License

This project is licensed under the MIT License — see the LICENSE file for details.

---

## Acknowledgments

- Firebase
- Tailwind CSS
- Stripe
- The React community

---

Last updated: 2026-07-05
Version: 1.0.0
