import React from 'react';
import Projects from './Project/Projects';

export default function Dashboard() {
  return (
    <div className='px-4 py-12 max-w-2xl mx-auto'>
      <h1 className='text-3xl font-bold  mb-4 text-slate-800'>
        Dashboard
      </h1>
      <p className='mb-2 py-6'>
        List of your projects:
      </p>
        <Projects/>
    </div>
  );
}