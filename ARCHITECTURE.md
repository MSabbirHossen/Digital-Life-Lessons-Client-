# Component Architecture Guide

## Authentication & Authorization System

### AuthContext (`src/context/AuthContext.jsx`)

**Purpose**: Centralized authentication state management
**Key Functionality**:

- User login/logout management
- Token storage and validation
- User role detection (user/premium/admin)
- Session persistence across page reloads
- Firebase authentication integration

### PrivateRoute (`src/components/PrivateRoute.jsx`)

**Purpose**: Route protection and access control
**Variants**:

- `PrivateRoute`: Protects authenticated user routes
- `AdminRoute`: Restricts to admin-only access
  **Behavior**: Redirects unauthorized users to login

---

## Navigation Components

### Navbar (`src/components/Navbar.jsx`)

**Key Features**:

- Responsive navigation menu
- User authentication status display
- Quick links to dashboard and profile
- Search integration
- Mobile hamburger menu
- Logout functionality

### Footer (`src/components/Footer.jsx`)

**Content Areas**:

- Company information
- Quick links and sitemap
- Social media links
- Newsletter subscription
- Copyright and legal links

---

## Lesson Management Components

### LessonCard (`src/components/LessonCard.jsx`)

**Purpose**: Reusable lesson preview component
**Displays**:

- Lesson thumbnail/cover image
- Title and description
- Instructor name
- Rating and review count
- Price (free/premium)
- Enrollment count
- Quick actions (bookmark, share)

---

## Page Structure

### Public Pages

#### Home (`src/pages/Home.jsx`)

- Hero section with call-to-action
- Featured lessons carousel
- Benefits showcase
- Statistics display
- Testimonials section
- Trust indicators

#### PublicLessons (`src/pages/PublicLessons.jsx`)

- Lesson grid/list view
- Advanced search bar
- Category filter panel
- Difficulty level filter
- Rating filter
- Sorting options (newest, popular, rating)
- Pagination controls

#### LessonDetailsPage (`src/pages/LessonDetailsPage.jsx`)

- Full lesson information
- Instructor profile card
- Student enrollment button
- Lesson content preview
- Reviews and ratings section
- Comments/Q&A section
- Related lessons suggestions
- Add to favorites button
- Share buttons

#### Login (`src/pages/Login.jsx`)

- Email input field
- Password input field
- Remember me checkbox
- Forgot password link
- Social login buttons
- Sign up link
- Error message display
- Loading state management

#### Register (`src/pages/Register.jsx`)

- Name field
- Email field
- Password field with strength meter
- Confirm password field
- Terms and conditions checkbox
- Email verification process
- Profile setup wizard

### User Dashboard Pages

#### Dashboard (`src/pages/Dashboard.jsx`)

- User welcome message
- Quick stats (lessons created, favorites)
- Recent activity list
- Learning progress tracker
- Quick action buttons
- Notifications panel
- Upcoming lessons

#### MyLessonsPage (`src/pages/MyLessonsPage.jsx`)

- User-created lessons list
- Lesson cards with:
  - Thumbnail
  - Title and description
  - Students enrolled count
  - Rating
  - Revenue (if applicable)
- Edit button
- Delete button with confirmation
- Publish/Draft status toggle
- Create new lesson button
- Filter and sort options
- Search functionality

#### AddLesson (`src/pages/AddLesson.jsx`)

- Lesson title input
- Description/content editor
- Category dropdown
- Difficulty level selector
- Price input (0 for free)
- File upload for course materials
- Preview pane
- Draft save button
- Publish button
- Cancel button with unsaved changes warning

#### UpdateLessonPage (`src/pages/UpdateLessonPage.jsx`)

- Pre-populated form with existing data
- All AddLesson fields
- Content revision tracking
- Update confirmation
- Rollback to previous version option
- Preview changes before publishing
- Publish or save as draft

#### MyFavoritesPage (`src/pages/MyFavoritesPage.jsx`)

- Grid view of favorited lessons
- Lesson cards
- Remove from favorites button
- Sort options (date added, rating)
- Filter by category
- Search functionality
- Empty state message

#### UserProfilePage (`src/pages/UserProfilePage.jsx`)

- Profile picture upload
- Personal information section:
  - Full name
  - Bio/about
  - Contact email
  - Phone number
- Account settings:
  - Password change
  - Email change
  - Account visibility
- Subscription status
- Learning statistics
- Notification preferences
- Delete account option (with confirmation)
- Activity log

---

### Premium & Payment Pages

#### PricingPage (`src/pages/PricingPage.jsx`)

- Pricing tier cards:
  - Free tier features
  - Premium tier features
  - Comparison table
- Current subscription status
- Upgrade/Downgrade buttons
- Feature comparison section
- FAQ section
- Testimonials from premium members
- Money-back guarantee display

#### PaymentSuccessPage (`src/pages/PaymentSuccessPage.jsx`)

- Success icon/animation
- Confirmation message
- Transaction details:
  - Amount paid
  - Transaction ID
  - Date
- Receipt download button
- Subscription activation message
- Next steps guide
- Dashboard access button
- Share subscription link
- Email confirmation notice

#### PaymentCancelPage (`src/pages/PaymentCancelPage.jsx`)

- Cancellation notice
- Reason selection form
- Feedback textarea
- Return to pricing button
- Retry payment option
- Contact support link
- Saved payment method persistence

---

### Admin Pages

#### AdminDashboardPage (`src/pages/AdminDashboardPage.jsx`)

- Statistics cards:
  - Total users
  - Total lessons
  - Premium users count
  - Reports pending
- Quick action buttons:
  - Manage users
  - Manage lessons
  - View reports
- Recent activities list
- System status indicators
- Alert notifications

#### ManageUsersPage (`src/pages/ManageUsersPage.jsx`)

- Users data table with columns:
  - User ID
  - Name
  - Email
  - Registration date
  - Subscription status
  - Role (user/admin)
- Search functionality
- Filter by role/status
- Pagination
- Action buttons per user:
  - View details
  - Change role
  - Suspend/Activate
  - Delete account
- Bulk actions support

#### ManageLessonsPage (`src/pages/ManageLessonsPage.jsx`)

- Lessons data table:
  - Title
  - Instructor
  - Category
  - Status (approved/pending/suspended)
  - Created date
  - Student count
- Search and filter
- Pagination
- Actions per lesson:
  - View/Edit
  - Approve/Reject
  - Suspend
  - Delete
- Content moderation tools

#### ReportedLessonsPage (`src/pages/ReportedLessonsPage.jsx`)

- Reports data table:
  - Reported lesson title
  - Report reason
  - Reported by (user)
  - Date reported
  - Status (pending/resolved)
- Report detail modal:
  - Full report description
  - Reporter information
  - Lesson information
  - Previous reports on lesson
- Action buttons:
  - Approve report (take action)
  - Reject report (dismiss)
  - Contact reporter
  - Contact instructor
- Filter by status/reason
- Search functionality

#### AdminProfilePage (`src/pages/AdminProfilePage.jsx`)

- Admin profile information
- Admin activity log
- Permission management
- Security settings:
  - Password change
  - 2FA setup
  - Session management
- Admin actions audit trail
- Account settings
- Admin role details

---

## Custom Hooks

### useLessons (`src/hooks/useLessons.js`)

**Functionality**:

- Fetch lessons from API with pagination
- Handle loading and error states
- Implement search functionality
- Support category filtering
- Manage lesson state updates
- Handle refresh and refetch

**Returns**:

```javascript
{
  lessons: [],
  loading: boolean,
  error: string | null,
  pagination: { page, limit, total },
  search: (query) => void,
  filter: (category) => void,
  refetch: () => void
}
```

### useInteractions (`src/hooks/useInteractions.js`)

**Functionality**:

- Toggle like/favorite on lessons
- Add/remove from favorites
- Submit lesson reports
- Manage comments
- Track user engagement

**Returns**:

```javascript
{
  isFavorited: boolean,
  toggleFavorite: () => void,
  reportLesson: (reason, description) => void,
  addComment: (text) => void,
  loading: boolean,
  error: string | null
}
```

---

## Service Layer

### API Service (`src/services/api.js`)

**Configuration**:

- Axios instance with base URL
- Request interceptor for token injection
- Response interceptor for error handling
- Timeout configuration

**Endpoints Abstraction**:

- GET /lessons/public (browse lessons)
- GET /lessons/:id (lesson details)
- POST /lessons (create lesson)
- PUT /lessons/:id (update lesson)
- DELETE /lessons/:id (delete lesson)
- GET /auth/admin/users (manage users)
- POST /stripe/create-checkout-session (create payment)

---

## Configuration Files

### Firebase Config (`src/config/firebase.js`)

- Firebase app initialization
- Authentication configuration
- Firestore database setup
- Cloud Storage configuration
- Real-time database listeners

---

## Styling System

### Tailwind Configuration (`tailwind.config.js`)

**Custom Theme**:

- Primary color (brand color)
- Secondary color (accent)
- Custom spacing scale
- Animation definitions
- Extended utilities

### Global Styles (`src/styles/index.css`)

**CSS Variables**:

- Color definitions
- Font scales
- Spacing utilities
- Animation keyframes

---

## Utility Pages

### NotFound (`src/pages/NotFound.jsx`)

- 404 error page
- Navigation back to home
- Search bar for recovery
- Helpful links

### Stubs (`src/pages/stubs.jsx`)

- Placeholder components during development
- Component skeleton components

---

**Last Updated**: May 16, 2026
