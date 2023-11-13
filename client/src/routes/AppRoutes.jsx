import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../components/pages/Home';
import Dashboard from '../components/pages/Dashboard';
import SignIn from '../components/pages/Client/SignIn';
import SignUp from '../components/pages/Client/SignUp';
import Profile from '../components/pages/Client/Profile';
import Header from '../components/Header';
import PrivateRoute from './PrivateRoute';
import Footer from '../components/Footer';
import Project from '../components/pages/Project/Project';
import NotFound from './NotFound';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/project/:id' element={<Project />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}
