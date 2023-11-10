import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import SignIn from '../pages/Client/SignIn';
import SignUp from '../pages/Client/SignUp';
import Profile from '../pages/Client/Profile';
import Header from '../components/Header';
import PrivateRoute from './PrivateRoute';
import Footer from '../components/Footer';

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
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}
