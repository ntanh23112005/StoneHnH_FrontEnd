import { GoogleOAuthProvider } from '@react-oauth/google';
import 'nprogress/nprogress.css';
import 'nprogress/nprogress.js';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx';
import { AuthWrapper } from './components/context/auth.context.jsx';
import AdminLayout from './components/layouts/admin/AdminLayout.jsx';
import ErrorPage from './components/layouts/Error.jsx';
import OwnerHome from './components/owner/owner.home.jsx';
import BookingAdminPage from './pages/admin/booking.management.jsx';
import HomestayDetailPageAD from './pages/admin/homestay.management.detail.jsx';
import HomestayAdminPage from './pages/admin/homestay.management.jsx';
import OverviewAdminPage from './pages/admin/overview.jsx';
import UserAdminPage from './pages/admin/user.management.jsx';
import CustomerProfile from './pages/customer.profile.jsx';
import HomePage from './pages/home.jsx';
import HomestayPage from './pages/homestay.jsx';
import HomestayDetailPage from './pages/homestayDetail.jsx';
import LoginPage from './pages/login.jsx';
import BookingOwnerPage from './pages/owner/booking.jsx';
import HomestayOwnerList from './pages/owner/homestay.list.jsx';
import OverviewOwner from './pages/owner/overview.owner.jsx';
import PrivateRoute from './pages/private.route.jsx';
import RegisterPage from './pages/register.jsx';
import ResetPasswordPage from "./pages/resetpassword.jsx";
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
        element: <HomePage />
      },
      {
        path: "/users",
        element: (
          <PrivateRoute allowedRoles={["ROLE_ADMIN"]}>
            <UserPage />
          </PrivateRoute>
        )
      },
      {
        path: "/category",
        element: <HomestayPage />
      },
      {
        path: "/detail/home-stay/:id",
        element: <HomestayDetailPage />
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <CustomerProfile />
          </PrivateRoute>
        )
      }
    ]
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: (
      <RegisterPage />
    )
  },
  {
    path: "/reset-password",
    element: (
      <ResetPasswordPage />
    )
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute allowedRoles={["ROLE_ADMIN"]}>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, path: "", element: <OverviewAdminPage /> },
      { path: "users", element: <UserAdminPage /> },
      { path: "bookings", element: <BookingAdminPage /> },
      { path: "homestays", element: <HomestayAdminPage /> },
      { path: "homestays/:id", element: <HomestayDetailPageAD /> },
    ],
  },
  {
    path: "/owner",
    element: (
      <PrivateRoute allowedRoles={["ROLE_OWNER"]}>
        <OwnerHome />
      </PrivateRoute>
    ),
    children: [
      { index: true, path: "", element: <OverviewOwner /> },
      { path: "homestay", element: <HomestayOwnerList /> },
      { path: "bookings", element: <BookingOwnerPage/> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <GoogleOAuthProvider clientId="103379412399-bqodeo39itadsdjvmf1i29rg3av6uctb.apps.googleusercontent.com">
    <AuthWrapper>
      <RouterProvider router={router} />
    </AuthWrapper>
  </GoogleOAuthProvider>
  // </React.StrictMode>

)