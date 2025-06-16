import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/login.jsx';
import RegisterPage from './pages/register.jsx';
import UserPage from './pages/user.jsx';
import BookPage from './pages/book.jsx';
import './styles/global.css'
import TodoApp from './components/todo/TodoApp.jsx';
import ErrorPage from './components/layouts/Error.jsx';
import { AuthWrapper } from './components/context/auth.context.jsx';
import PrivateRoute from './pages/private.route.jsx';
import 'nprogress/nprogress.css';
import 'nprogress/nprogress.js';
import HomePage from './pages/home.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
// Base font
import "@fontsource/inter"; // 400 regular

// Optional weights
import "@fontsource/inter/500.css"; // Medium
import "@fontsource/inter/600.css"; // Semi-bold
import "@fontsource/inter/700.css"; // Bold

// Optional italic versions
import "@fontsource/inter/400-italic.css";
import "@fontsource/inter/700-italic.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        // element: <TodoApp />,
        element: <HomePage />
      },
      {
        path: "/users",
        element: <UserPage />
      },
      {
        path: "/books",
        element:
          <PrivateRoute>
            <BookPage />
          </PrivateRoute>
      },
      {
        path: "/homestays",
        element: <h1>HIHI</h1>
      }
    ]
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <AuthWrapper>
    <RouterProvider router={router} />
  </AuthWrapper>
  // </React.StrictMode>
)
