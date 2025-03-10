# RentEase Platform Folder Structure

## Overview

This document outlines the folder structure for the RentEase platform, designed to support multiple user types (Landlord, Tenant, Admin) with a modular and scalable architecture. The structure follows a shell-like pattern with shared layouts and role-specific features.

## Root Structure

```
├── app/
│   ├── (auth)/                   # Authentication routes group
│   ├── (dashboard)/              # Dashboard routes group
│   ├── (marketing)/              # Marketing/public pages group
│   ├── api/                      # API routes
│   └── globals.css               # Global styles
├── components/
│   ├── auth/                     # Authentication components
│   ├── dashboard/                # Dashboard components
│   │   ├── shell/               # Dashboard shell components
│   │   │   ├── header/          # Top navigation bar
│   │   │   ├── sidebar/         # Side navigation
│   │   │   └── main/            # Main content area
│   │   ├── widgets/             # Dashboard widgets
│   │   └── charts/              # Data visualization components
│   ├── layout/                   # Layout components
│   ├── marketing/                # Marketing components
│   ├── properties/              # Property-related components
│   ├── profile/                 # Profile components
│   └── ui/                      # Shared UI components
├── lib/                         # Utility functions and shared logic
├── hooks/                       # Custom React hooks
├── styles/                      # Additional styles
└── types/                      # TypeScript type definitions
```

## Detailed Structure

### Dashboard Shell Layout

Based on the screenshot, the dashboard follows a shell-like structure with:

```
components/dashboard/shell/
├── DashboardShell.tsx           # Main dashboard container
├── header/
│   ├── Header.tsx               # Top navigation bar
│   ├── Search.tsx               # Global search component
│   ├── UserMenu.tsx             # User dropdown menu
│   └── Notifications.tsx        # Notifications dropdown
├── sidebar/
│   ├── Sidebar.tsx             # Main sidebar component
│   ├── Navigation.tsx          # Navigation menu
│   └── Logo.tsx                # Brand logo component
└── main/
    └── MainContent.tsx         # Main content area wrapper
```

### Property Management Structure

Based on the screenshot's property listing interface:

```
components/properties/
├── listing/
│   ├── PropertyCard.tsx        # Property card component
│   ├── PropertyGrid.tsx        # Grid view layout
│   ├── PropertyList.tsx        # List view layout
│   └── PropertyMap.tsx         # Map view component
├── filters/
│   ├── FilterBar.tsx          # Main filter bar
│   ├── LocationFilter.tsx     # Location selector
│   ├── PriceFilter.tsx       # Price range filter
│   └── TypeFilter.tsx        # Property type filter
└── details/
    ├── PropertyDetails.tsx    # Property details view
    ├── Gallery.tsx           # Photo gallery
    └── Amenities.tsx         # Amenities list
```

### Role-Based Views

The platform supports multiple user types with specific views:

```
app/(dashboard)/
├── landlord/                  # Landlord-specific routes
│   ├── properties/           # Property management
│   ├── tenants/             # Tenant management
│   ├── finances/            # Financial management
│   └── maintenance/         # Maintenance requests
├── tenant/                   # Tenant-specific routes
│   ├── rent/                # Rent payments
│   ├── maintenance/         # Maintenance requests
│   └── documents/           # Document access
└── admin/                    # Admin-specific routes
    ├── users/               # User management
    ├── properties/          # Property oversight
    └── settings/            # Platform settings
```

### Shared Components

Common components used across different sections:

```
components/ui/
├── button/                   # Button variants
├── card/                    # Card components
├── dialog/                  # Modal dialogs
├── forms/                   # Form elements
├── navigation/              # Navigation components
└── feedback/                # Alerts and notifications
```

## Key Features

1. **Modular Architecture**

   - Each feature area is self-contained
   - Components are grouped by functionality
   - Shared components are easily accessible

2. **Role-Based Organization**

   - Clear separation of user-specific features
   - Shared layouts for consistent UX
   - Easy to extend for new user types

3. **Scalable Structure**

   - Easy to add new features
   - Clear component hierarchy
   - Consistent naming conventions

4. **Performance Considerations**
   - Route grouping for better code splitting
   - Shared components for reduced bundle size
   - Lazy loading support for larger features

## Style Guidelines

1. **Component Naming**

   - Use PascalCase for component files
   - Use descriptive, feature-based names
   - Include type in name (e.g., PropertyCard)

2. **File Organization**

   - Group related components together
   - Keep components close to their usage
   - Share common utilities in lib/

3. **Code Splitting**
   - Use dynamic imports for large features
   - Group related routes together
   - Lazy load non-critical components

## Future Considerations

1. **Internationalization**

   - Add locale-specific folders
   - Support for multiple languages
   - RTL layout support

2. **Theme Support**

   - Dark/light mode components
   - Custom theme configurations
   - Brand customization

3. **Mobile Optimization**
   - Responsive components
   - Touch-friendly interfaces
   - Mobile-specific layouts

# Folder Structure

```
rent/
├── frontend/                  # Move current Next.js frontend here
│   ├── app/
│   ├── components/
│   └── ...
│
├── backend/                   # NestJS backend application
│   ├── src/
│   │   ├── config/           # Configuration files
│   │   │   ├── database.config.ts
│   │   │   └── jwt.config.ts
│   │   │
│   │   ├── common/           # Shared code
│   │   │   ├── decorators/
│   │   │   ├── filters/
│   │   │   ├── guards/
│   │   │   ├── interceptors/
│   │   │   └── pipes/
│   │   │
│   │   ├── modules/          # Feature modules
│   │   │   ├── auth/         # Authentication module
│   │   │   │   ├── dto/
│   │   │   │   ├── entities/
│   │   │   │   ├── guards/
│   │   │   │   ├── strategies/
│   │   │   │   └── auth.service.ts
│   │   │   │
│   │   │   ├── users/        # Users module
│   │   │   ├── properties/   # Properties module
│   │   │   ├── tenants/      # Tenants module
│   │   │   ├── leases/       # Leases module
│   │   │   ├── payments/     # Payments module
│   │   │   ├── maintenance/  # Maintenance module
│   │   │   └── documents/    # Documents module
│   │   │
│   │   ├── prisma/          # Prisma schema and migrations
│   │   │   ├── schema.prisma
│   │   │   └── migrations/
│   │   │
│   │   ├── utils/           # Utility functions
│   │   ├── types/           # TypeScript types/interfaces
│   │   ├── app.module.ts    # Root application module
│   │   └── main.ts          # Application entry point
│   │
│   ├── test/                # Test files
│   │   ├── e2e/
│   │   └── unit/
│   │
│   ├── docs/                # Backend documentation
│   ├── .env                 # Environment variables
│   ├── .env.example         # Example environment variables
│   ├── nest-cli.json       # NestJS CLI configuration
│   ├── package.json        # Backend dependencies
│   └── tsconfig.json       # TypeScript configuration
│
├── shared/                  # Shared code between frontend and backend
│   ├── types/              # Shared TypeScript interfaces
│   └── constants/          # Shared constants
│
├── docs/                    # Project documentation
├── .github/                 # GitHub workflows
├── package.json            # Root package.json for workspaces
└── README.md               # Project overview
```

## Key Points

1. **Monorepo Structure**

   - Frontend and backend in single repository
   - Shared types and constants
   - Easier deployment and version control

2. **Backend Organization**

   - Module-based architecture
   - Clear separation of concerns
   - Easy to scale and maintain

3. **Shared Code**

   - Common types between frontend and backend
   - Consistent data structures
   - DRY principle

4. **Documentation**

   - Separate docs for frontend and backend
   - API documentation
   - Setup guides

5. **Testing**

   - Dedicated test directories
   - Separate unit and e2e tests
   - Test utilities and mocks

6. **Configuration**
   - Environment-based configuration
   - Secure credential management
   - Easy to switch between environments
