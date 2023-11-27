import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { signedOut } from '../../redux/reducers/clientSlice';
import { signOut } from '../../api';
import ProjectStats from './Project/ProjectStats';
import ClientStats from './Admin/ClientStats';

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
    return <p className='small px-2'>{currentClient && `${currentClient.email}!`}{currentClient.isAdmin && ' (admin)'}</p>;
  }

  return (
    <div className='main'>
      <div className="card">
          <Card title={currentClient? `Welcome ${currentClient.username}!`: 'Welocme friend!'} 
            subTitle={subtitle}> 
           {currentClient &&  <ProjectStats/>}
            {currentClient? ( 
            <div className="grid text-center py-2">
              {currentClient.isAdmin && <ClientStats/>}               
                <div className="col-12 md:col-6 lg:col-3">
                  <div className="surface-0 shadow-1 p-3 border-1 border-50 border-round">
                      <div className="text-900 gap-3 py-2">
                        <Link to='/project/create'>
                          <Button 
                            severity='success'
                            label="New project"
                            size="small"
                            icon='pi pi-plus'
                            />
                          </Link> 
                      </div>
                  </div>
                </div>
                <div className="col-12 md:col-6 lg:col-3">
                  <div className="surface-0 shadow-1 p-3 border-1 border-50 border-round">
                <div className="text-900 gap-3 py-2">
                        <Link to='/profile'>
                          <Button 
                            severity='info'
                            label="Profile"
                            size="small"
                            icon='pi pi-user'
                            />
                        </Link>
                      </div>
                    </div>
                </div>
                <div className="col-12 md:col-6 lg:col-3">
                  <div className="surface-0 shadow-1 p-3 border-1 border-50 border-round">
                        <div className="text-900 gap-3 py-2">
                          <Button 
                            onClick={handleSignOut}
                            severity='danger'
                            label="Logout"
                            size="small"
                            icon='pi pi-power-off'
                            />
                          </div>
                        </div>
                    </div>
                    </div>
                  ) :  <div className="grid surface-0 text-center">
                      <div className="col-12 md:col-6 lg:col-3">
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
