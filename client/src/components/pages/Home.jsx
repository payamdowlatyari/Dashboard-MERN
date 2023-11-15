import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { signOut } from '../../redux/reducers/clientSlice';

export default function Home() {
  const { currentClient} = useSelector((state) => state.client);
  console.log(currentClient)
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      await fetch('/api/client/auth/signout');
      dispatch(signOut())
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='main'>
      <div className="card">
        <Card title={currentClient? `Welcome ${currentClient.username}!`: 'Welocme friend!'}> 
            <div className="flex flex-column md:flex-row py-5">  
                {currentClient? ( <> 
                    <div className="w-full md:w-5 flex flex-column align-items-center gap-3 py-5">
                    <div className="text-900 gap-3 py2">
                      <Link to='/dashboard'>
                      <Button 
                        severity='info'
                        label="Checkout your projects"
                        text size="small"
                        />
                      </Link>
                      </div>
                      <div className="text-900 gap-3 py2">
                        <Link to='/project/create'>
                        <Button 
                        severity='info'
                        label="Create a project"
                        text size="small"
                        />
                        </Link> 
                      </div>
                      </div>
                      <div className="w-full md:w-2">
                      <Divider layout="vertical" className="hidden md:flex">
                      </Divider>
                      <Divider layout="horizontal" className="flex md:hidden" align="center">
                      </Divider>
                    </div>
                    <div className="w-full md:w-5 flex flex-column align-items-center gap-3 py-5">                    
                    <div className="text-900 gap-3 py2">
                      <Link to='/profile'>
                      <Button 
                      severity='info'
                        label="Manage your profile"
                        text size="small"
                        />
                        </Link>
                      </div>
                      <div className="text-900 gap-3 py2">
                      <Button 
                        onClick={handleSignOut}
                        severity='danger'
                        label="Logout"
                        text size="small"
                        />
                      </div>
                  </div>
                  </> ) : 
                  <div className="text-900 gap-3 py2">
                    <Link to='/sign-in'>
                      <Button 
                      severity='info'
                        label="Please login"
                        text size="small"
                        />
                  </Link>
                </div>}
            </div>
        </Card>
      </div>
    </div>
  );
}
