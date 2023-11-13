import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';

export default function Home() {
  const { currentClient} = useSelector((state) => state.client);
  console.log(currentClient)

  return (
    <div className='container'>
      <div className="card">
        <Card title={currentClient? `Welcome ${currentClient.username}!`: 'Welocme friend!'}> 
        <Divider />
        {currentClient? 
        (<div>
          <p className="m-0" >Checkout your<Link to='/dashboard'>projects</Link></p>
          <p className="m-0">Manage your<Link to='/profile'>profile</Link></p>
        </div>) : 
        <p className="m-0" >Please<Link to='/sign-in'>login</Link></p>}
        </Card>
      </div>
    </div>
  );
}
