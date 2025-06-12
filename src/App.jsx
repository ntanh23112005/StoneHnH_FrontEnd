import './components/todo/todo.css';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import { Outlet } from 'react-router-dom';
import { getAccountAPI } from './services/api.service';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './components/context/auth.context';
import { Spin } from 'antd';
import Test from './components/todo/kkk';

const App = () => {

  const { setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext);

  useEffect(() => {
    fetchUserInfo();
  }, [])

  // const delay = (milSeconds) => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve()
  //     }, milSeconds)
  //   })
  // }
  const fetchUserInfo = async () => {
    const res = await getAccountAPI()
    if (res.data) {
      setUser(res.data.user)
    }
    setIsAppLoading(false)
  }

  return (
    <>

      <>
        <Header />
        <Outlet />
        <Footer />
      </>

    </>
  )
}

export default App
