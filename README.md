# Platform Admin Management System

A modern, responsive admin management dashboard built with React, TypeScript, and Tailwind CSS. This application provides comprehensive tools for managing platform administrators, their society assignments, and tracking their activities.

## Required Columns:
-	Admin Name & Email (with avatar/initials)
-	Status (Active, Inactive, Pending) with visual indicators
-	Assigned Societies (count + hover preview)
-	Last Activity (relative time + full timestamp on hover)
-	Performance Metrics (login count, tickets resolved)
-	Actions (View, Edit, Enable/Disable, Delete)

## Required Functionality:
-	Search: Real-time search by name/email
-	Filtering: Filter by status (All, Active, Inactive, Pending)
-	Sorting: Sortable columns (name, last activity, society count)
-	Pagination: Handle large datasets (12 items per page)
-	Bulk Actions: Select multiple admins for bulk operations
-	Responsive Design: Mobile-friendly card view for smaller screens


## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/SecondMikasa/SuperAdminDashboard
   cd SuperManagementDashboard
```

2. **Install dependencies**
```bash
   npm install
   # or
   pnpm install
   # or
   bun install
   # or
   yarn install
```

3. **Start the development server**
```bash
   npm run dev
   # or
   pnpm run dev
   # or
   bun run dev
   # or
   yarn dev
```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Build for Production

```bash
   npm run build
   # or
   pnpm run build
   # or
   bunn run build
   # or
   yarn build
```

The built files will be in the `dist` directory.

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   │   ├── Avatar.tsx
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Checkbox.tsx
│   │   ├── Dialog.tsx
│   │   ├── Dropdown-menu.tsx
│   │   ├── Input.tsx
│   │   ├── Label.tsx
│   │   ├── Modal.tsx
│   │   ├── Select.tsx
│   │   ├── Toast-notification.tsx
│   │   └── Tooltip.tsx
│   ├── modules/         # Feature-specific components
│   │   ├── Bulk-edit.tsx
│   │   ├── Card-view.tsx
│   │   └── Edit-modal.tsx
│   ├── AdminDetailView.tsx    # Admin detail page
│   ├── AdminListView.tsx      # Admin list/table view
│   └── AdminModal.tsx         # Admin creation modal
├── data/                # Mock data and API layer
│   └── mockData.ts
├── types/               # TypeScript type definitions
│   └── admin.ts
├── utils/               # Utility functions
│   ├── cn.ts           # Class name utilities
│   └── formatters.ts   # Data formatting utilities
├── lib/                 # Library configurations
│   └── utils.ts
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🛠️ Technology Stack

### Core Technologies
- **React 19.1.0** - Modern React with latest features
- **TypeScript 5.8.3** - Type-safe JavaScript
- **Vite 7.0.4** - Fast build tool and dev server
- **Tailwind CSS 4.1.11** - Utility-first CSS framework

### UI Components & Libraries
- **Radix UI** - Accessible, unstyled UI primitives
  - Avatar, Checkbox, Dialog, Dropdown Menu
  - Label, Select, Slot, Tooltip
- **Lucide React** - Beautiful, customizable icons
- **Date-fns** - Modern JavaScript date utility library
- **Class Variance Authority** - Component variant management
- **Tailwind Merge** - Intelligent Tailwind class merging

### Development Tools
- **ESLint** - Code linting and formatting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Vite React Plugin** - React support for Vite

## 🎨 Design System

### Color Palette
```css
Primary Colors:
- Blue: #007AFF
- Purple: #6366F1

Status Colors:
- Success: #10B981 (Active admins)
- Warning: #F59E0B (Pending admins)
- Error: #EF4444 (Inactive admins)
```

### Component Variants
- **Buttons**: Primary, Secondary, Outline, Ghost, Destructive
- **Badges**: Default, Secondary, Outline, Destructive
- **Cards**: Default with hover effects and shadows
- **Inputs**: Standard with error states and validation

## 📱 Responsive Breakpoints

```css
sm: 640px   # Small devices (phones)
md: 768px   # Medium devices (tablets)
lg: 1024px  # Large devices (desktops)
xl: 1280px  # Extra large devices
```

## 🔧 Configuration

### Tailwind Configuration
The project uses Tailwind CSS v4 with custom theme extensions:
- Custom color palette
- Extended backdrop blur utilities
- Responsive design utilities

### Vite Configuration
- React plugin for JSX support
- Tailwind CSS plugin for styling
- TypeScript support out of the box

## 📊 Data Structure

### Admin Type Definition
```typescript
interface Admin {
  id: number
  name: string
  email: string
  phone: string
  status: 'active' | 'inactive' | 'pending'
  assignedSocieties: Society[]
  createdAt: string
  lastActivity: string
  loginCount: number
  ticketsResolved: number
  recentActivities: Activity[]
}
```

### Society Type Definition
```typescript
interface Society {
  id: number
  name: string
  unitCount: number
}
```

## 🎯 Key Components

### AdminListView
- **Purpose**: Main dashboard with admin list/table
- **Features**: Search, filter, sort, bulk operations, pagination
- **Views**: Desktop table view, mobile card view

### AdminDetailView
- **Purpose**: Detailed view of individual admin
- **Features**: Profile information, performance metrics, society assignments
- **Sections**: Personal info, assigned societies, recent activities

### EditAdminModal
- **Purpose**: Create and edit admin functionality
- **Features**: Form validation, society assignment with search
- **Validation**: Email format, required fields, phone number

### UI Components
- **Reusable**: Button, Input, Card, Badge, Avatar, etc.
- **Accessible**: ARIA labels, keyboard navigation
- **Consistent**: Unified design system across all components

## 🚀 Development

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

### Code Style
- **TypeScript**: Strict mode enabled
- **ESLint**: Configured with React and TypeScript rules
- **Prettier**: Code formatting (if configured)
- **Component Structure**: Functional components with hooks

### Best Practices
- **Type Safety**: Full TypeScript coverage
- **Component Composition**: Reusable, composable components
- **Performance**: Memoization where appropriate
- **Accessibility**: WCAG compliant components
- **Mobile First**: Responsive design approach
