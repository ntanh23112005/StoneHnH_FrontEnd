import './components/todo/todo.css';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

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
  )
}

export default App
