import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import { Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "../src/styles/global.css";

import AOS from "aos";
import "aos/dist/aos.css";
import { getAccountAPI } from "./services/auth/api.auth";
import { AuthContext } from "./components/context/auth.context";

const App = () => {
  //Animation HomePage
  useEffect(() => {
    AOS.init({
      duration: 1000, // thời gian chạy hiệu ứng (ms)
      // once: true      // chỉ chạy 1 lần
    });
  }, []);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
