import { Routes, Route, Outlet } from 'react-router';
import { lazy } from 'react';
import { tabsArr } from './tabs';
import './App.css'
import Header from './components/Header/Header';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'))
const TabInfoPage = lazy(() => import('./pages/TabInfoPage/TabInfoPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'))

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<HomePage />} />
        {tabsArr.map(tab => (
          <Route path={tab.href} element={<TabInfoPage tabInfo={tab.name} />} />
        ))}
        <Route path='*' element={<NotFoundPage/>} />
      </Routes>
      <Outlet />
    </>
  )
}

export default App
