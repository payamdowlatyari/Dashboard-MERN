import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Home() {
  const { currentClient} = useSelector((state) => state.client);
  console.log(currentClient)

  return (
    <div className='px-4 py-12 max-w-2xl mx-auto'>
      <h1 className='text-3xl font-bold  mb-4 text-slate-800'>
        Welcome {currentClient? currentClient.username: 'Friend'}!
      </h1>
      <p>Checkout your <Link to='/dashboard'>projects</Link>.</p>
      <p>Manage your <Link to='/profile'>profile</Link>.</p>

    </div>
  );
}
