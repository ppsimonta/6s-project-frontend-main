# 6S Audit web app front-end

**6S Audit Web App** is an application designed for companies and organizations that want to perform and manage 6S audits. The app provides users with tools for managing audit areas, rooms, and processes, completing audits, and generating reports. The primary role of the frontend is to offer an easy-to-use interface where users can register, log in, perform audits, view results, and manage their user profiles. Admin users also have their own section where they can manage users and view audit statistics.

## Purpose

This frontend application is designed to provide users and administrators with an interface for conducting and managing audits. The app supports the following functionalities:
- User registration and login
- Completing and reviewing audits
- Managing user profiles
- Admin users can manage other users and view audit statistics
- Password recovery and account settings

### **Pages & Routes**

- **Home Page**: The landing page of the app with general information.
- **Register**: A page for new users to register by providing necessary details.
- **Login**: A page for existing users to log in and authenticate their identity.
- **Dashboard**: Displays user-specific information, including ongoing audits.
- **Search Page**: Allows users to search audits, rooms, and more.
- **Audit Page**: Pages for both filling out audits and reviewing completed audits.
- **Forgot Password / Reset Password**: Allows users to reset their password via email.
- **Profile Settings**: Lets users update their profile settings, including username and password.
- **Admin Page**: Only available to admins, it allows managing users and viewing audit statistics.
- **Statistics Page**: Displays audit statistics and insights.

### **Components**

- **SearchBar**: A search bar to filter audits or rooms across the platform.
- **Navbar**: A navigation bar that provides links to all major sections of the app.
- **LogoutButton**: Allows users to log out of the system.
- **VerifyEmail**: A component to handle email verification during registration.
- **DeleteAccount**: Allows users to delete their accounts.
  
### **State Management**

The application uses **React Context API** for managing user authentication and profile data across the app. The **UserContextProvider** provides the current user data and handles authentication status.

### **API Integration**

- **Axios**: Axios is used for making API requests to the backend, which is set up with the base URL of the API (`VITE_REACT_APP_API_URL`).
- The application interacts with various endpoints for login, registration, retrieving audits, and managing user data.

## Tech Stack

- **React**: JavaScript library for building user interfaces.
- **React Router**: For navigation between different pages in the app.
- **Axios**: HTTP client for making API requests to the backend.
- **React Hot Toast**: Used for displaying notifications (e.g., for login success or errors).
- **CSS**: For styling the app, with the use of custom styles defined in `App.css`.
- **Roboto Font**: Google Fonts for typography.

## Installation

Prerequisites:

- Git
- NodeJS
- 6S Audit web app back-end

```sh
git clone https://github.com/ppsimonta/6s-project-frontend-main.git
cd 6s-project-frontend
npm install
```

Remember to rename the `.env.example` file to `.env` and fill in the values.

## Running the app

Once installed you can run it in dev mode or preview mode
```sh
npm run dev
```

or

```sh
npm run build
npm run preview
```
