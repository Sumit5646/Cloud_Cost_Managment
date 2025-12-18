# Cloud Cost Management Application

A modern, feature-rich cloud cost management dashboard built with React, Vite, and Tailwind CSS. This application provides comprehensive tools for tracking cloud spending, managing resources, and analyzing usage patterns across multiple cloud services.

## 🎯 Features

- **User Authentication**: Secure login and signup with JWT-based authentication
- **Role-Based Access Control**: Admin, Manager, and User roles with different permission levels
- **Dashboard**: Real-time overview of cloud spending, resource usage, and key metrics
- **Cost Analytics**: Detailed analysis of spending trends, service breakdown, and cost forecasting
- **Cloud Storage Management**: Monitor and manage cloud storage resources
- **User Management**: Admin panel for user management and role assignment
- **Settings**: Configurable account settings, notifications, and preferences
- **Responsive Design**: Fully responsive UI optimized for desktop and mobile devices
- **Data Visualization**: Interactive charts and graphs using Recharts

## 📋 Project Structure

```
clo/myapp/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Modal.jsx
│   │   ├── PasswordChange.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── RoleBasedUI.jsx
│   │   ├── Sidebar.jsx
│   │   └── UserAvatar.jsx
│   ├── context/             # React Context for state management
│   │   └── AuthContext.jsx
│   ├── pages/               # Page components
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── CloudDashboard.jsx
│   │   ├── Analytics.jsx
│   │   ├── CloudStorage.jsx
│   │   ├── Settings.jsx
│   │   ├── Profile.jsx
│   │   └── UserDashboard.jsx
│   ├── services/            # API and service functions
│   │   ├── apiService.js
│   │   ├── auth.js
│   │   ├── storage.js
│   │   └── validation.js
│   ├── utils/               # Utility functions
│   ├── assets/              # Static assets and mock data
│   ├── App.jsx              # Root component
│   ├── main.jsx             # Application entry point
│   ├── index.css            # Global styles
│   └── App.css              # App-specific styles
├── jsondata/
│   └── api.json             # Mock API data
├── public/                  # Public static files
├── index.html               # HTML entry point
├── package.json             # Project dependencies
├── vite.config.js           # Vite configuration
├── eslint.config.js         # ESLint configuration
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd clo/myapp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Running with Mock API Server

To run the JSON Server for mock API data:

```bash
npm run json-server
```

This will start a JSON server on port 3000 with the mock data from `jsondata/api.json`.

## 📦 Available Scripts

- `npm run dev` - Start the development server with Vite
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality
- `npm run json-server` - Start the mock JSON server

## 🔐 Authentication

The application uses JWT-based authentication with the following roles:

### Default Test Users

- **Admin User**
  - Email: `admin@cloudcost.com`
  - Password: `admin123`

- **Manager User**
  - Email: `manager@cloudcost.com`
  - Password: `manager123`

- **Regular User**
  - Email: `user@cloudcost.com`
  - Password: `user123`

## 🛠️ Technologies Used

### Frontend
- **React 19** - UI library
- **React Router 7** - Client-side routing
- **Vite 7** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **Recharts** - Data visualization library

### State Management & Utils
- **React Context API** - Application state management
- **JWT Decode** - JWT token decoding
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **Motion** - Animation library

### Development Tools
- **ESLint** - Code linting
- **Vite Plugin React** - React support in Vite
- **Tailwind CSS Vite Plugin** - Tailwind CSS integration

## 📊 Key Components

### AuthContext.jsx
Manages user authentication state, login/logout functionality, and user information across the application.

### ProtectedRoute.jsx
Higher-order component that protects routes requiring authentication and handles unauthorized access.

### RoleBasedUI.jsx
Conditionally renders UI elements based on user role (admin, manager, user).

### CloudDashboard.jsx
Main dashboard displaying:
- Total cloud spending
- Spending breakdown by service
- Monthly spending trends
- Service utilization metrics

### Analytics.jsx
Provides detailed analytics including:
- CPU utilization metrics
- API call statistics
- Usage trends over time
- Performance indicators

### CloudStorage.jsx
Manages cloud storage resources with real-time usage information.

### Settings.jsx
Configuration page for:
- Account settings
- Notification preferences
- Regional settings
- Email, SMS, and Slack notifications

## 💾 Mock Data Structure

The application uses mock data from `jsondata/api.json` containing:

- **Dashboard Stats**: Total spend, compute, storage, and network costs
- **Spending Charts**: Monthly spending trends
- **Service Breakdown**: Cost breakdown by service type
- **Users**: Test user accounts with different roles
- **Departments**: Organization departments and their service usage
- **Analytics**: CPU utilization, API calls, and performance metrics
- **Cloud Usage**: Service usage statistics
- **Settings**: Account and notification configurations

## 🔄 Data Flow

```
API/Mock Data (api.json)
         ↓
    apiService.js
         ↓
   React Components
         ↓
   User Interface
```

## 📝 Development Workflow

1. **Components**: Build reusable React components in `src/components/`
2. **Pages**: Create page components in `src/pages/`
3. **Services**: Add API integration logic in `src/services/`
4. **State Management**: Use React Context for global state in `src/context/`
5. **Styling**: Use Tailwind CSS classes for styling

## 🧪 Testing

To test the application:

1. Use the default test credentials to log in
2. Navigate through different pages and verify functionality
3. Test role-based access (admin features vs. user features)
4. Check responsive design on different screen sizes

## 🎨 Styling

The application uses Tailwind CSS for styling. Configuration can be found in the `tailwind.config.cjs` file.

Key styling features:
- Responsive grid layouts
- Custom color schemes
- Dark mode support (if configured)
- Smooth transitions and animations

## 🚧 Future Enhancements

Refer to [TODO.md](TODO.md) for planned improvements and features in development.

## 📄 License

This project is private and proprietary.

## 👤 Author

Cloud Cost Management Team

## 🤝 Contributing

For internal contributions, please follow the project's code style and submit pull requests for review.

---

**Last Updated**: December 2025
