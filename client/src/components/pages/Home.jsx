import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { signedOut } from '../../redux/reducers/clientSlice';
import { signOut } from '../../api';

export default function Home() {
  const { currentClient} = useSelector((state) => state.client);
  console.log(currentClient)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      dispatch(signedOut());
      navigate('/sign-in');
    } catch (error) {
      console.log(error);
    }
  }

  const subtitle = () => {
    return <span className='txt-dark-gray small px-2'>{currentClient && `${currentClient.email}!`}</span>;
  }

  return (
    <div className='main'>
      <div className="card">
      <Card title={currentClient? `Welcome ${currentClient.username}!`: 'Welocme friend!'} 
            subTitle={subtitle}> 

      {currentClient? ( 
      <div className="grid surface-0 text-center">
         {currentClient.isAdmin && 
         <div className="col-12 md:col-4 mb-4 mt-4 px-5">
            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                <i className="pi pi-users text-4xl text-blue-500"></i>
            </span>
            <div className="text-900 gap-3 py-2">
                      <Link to='/admin'>
                      <Button 
                        severity='info'
                        label="Clients"
                        text size="small"
                        />
                      </Link>
                      </div>
            </div>}
        <div className="col-12 md:col-4 mb-4 mt-4 px-5">
            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                <i className="pi pi-folder-open text-4xl text-blue-500"></i>
            </span>
            <div className="text-900 gap-3 py-2">
                      <Link to='/dashboard'>
                      <Button 
                        severity='info'
                        label="Projects"
                        text size="small"
                        />
                      </Link>
                      </div>
            </div>
            <div className="col-12 md:col-4 mb-4 mt-4 px-5">
            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                <i className="pi pi-plus text-4xl text-blue-500"></i>
            </span>
            <div className="text-900 gap-3 py-2">
                        <Link to='/project/create'>
                        <Button 
                        severity='info'
                        label="New project"
                        text size="small"
                        />
                        </Link> 
                      </div>
            </div>
            <div className="col-12 md:col-4 mb-4 mt-4 px-5">
            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                <i className="pi pi-user-edit text-4xl text-blue-500"></i>
            </span>
            <div className="text-900 gap-3 py-2">
                      <Link to='/profile'>
                      <Button 
                      severity='info'
                        label="Profile"
                        text size="small"
                        />
                        </Link>
              </div>
            </div>
            <div className="col-12 md:col-4 mb-4 mt-4 px-5">
            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                <i className="pi pi-power-off text-4xl text-red-500"></i>
            </span>
                    <div className="text-900 gap-3 py-2">
                      <Button 
                        onClick={handleSignOut}
                        severity='danger'
                        label="Logout"
                        text size="small"
                        />
                      </div>
                </div>
                </div>
              ) :  <div className="grid surface-0 text-center">
                  <div className="col-12 md:col-4 mb-4 mt-4 px-5">
                      <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                          <i className="pi pi-user text-4xl text-blue-500"></i>
                      </span>
                          <div className="text-900 gap-3 py-2">
                          <Link to='/sign-in'>
                            <Button 
                            severity='info'
                              label="Login"
                              text size="small"
                              />
                          </Link>
                        </div>
                        </div>
                  </div>
                }
        </Card>
      </div>
    </div>
  );
}
