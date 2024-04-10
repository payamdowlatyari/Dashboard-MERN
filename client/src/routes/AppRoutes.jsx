import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import Home from '../components/pages/Home';
import Admin from '../components/pages/Admin';
import Dashboard from '../components/pages/Dashboard';
import SignIn from '../components/pages/Client/SignIn';
import SignUp from '../components/pages/Client/SignUp';
import Profile from '../components/pages/Client/Profile';
import Header from '../components/Header';
import PrivateRoute from './PrivateRoute';
import Footer from '../components/Footer';
import Project from '../components/pages/Project/Project';
import NotFound from './NotFound';
import NewProject from '../components/pages/Project/NewProject';
import EditClient from '../components/pages/Admin/EditClient';
import UpdateProject from '../components/pages/Project/UpdateProject';
import setAuthToken from '../api/setAuthToken';
import { signedOut } from '../redux/reducers/clientSlice';

export default function AppRoutes() {

  const {currentClient} = useSelector(state => state.client)
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (localStorage.token) {
  //     setAuthToken(localStorage.token);
  //   }
  //   // store.dispatch(loadUser());

  //   window.addEventListener('storage', () => {
  //     if (!localStorage.token) dispatch(signedOut());
  //   });
  // }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={!currentClient ? <SignIn/> : <Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path='/admin' element={currentClient && currentClient.isAdmin? <Admin/> : <Home/>}/>
          <Route path='/admin/client/edit/:id' element={currentClient && currentClient.isAdmin? <EditClient/> : <Home/>}/>
          <Route path='/admin/project/update/:id' element={currentClient && currentClient.isAdmin? <UpdateProject/> : <Home/>}/>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/project/:id' element={<Project />} />
          <Route path='/project/create' element={<NewProject/>}/>
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}
