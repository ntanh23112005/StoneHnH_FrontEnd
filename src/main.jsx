import 'nprogress/nprogress.css';
import 'nprogress/nprogress.js';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx';
import { AuthWrapper } from './components/context/auth.context.jsx';
import ErrorPage from './components/layouts/Error.jsx';
import BookPage from './pages/book.jsx';
import HomePage from './pages/home.jsx';
import HomestayPage from './pages/homestay.jsx';
import HomestayDetailPage from './pages/homestayDetail.jsx';
import LoginPage from './pages/login.jsx';
import PrivateRoute from './pages/private.route.jsx';
import RegisterPage from './pages/register.jsx';
import UserPage from './pages/user.jsx';
import './styles/global.css';

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
        path: "/category",
        element: <HomestayPage />
      },
      {
        path: "/detail/home-stay/:id",
        element: <HomestayDetailPage />
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
