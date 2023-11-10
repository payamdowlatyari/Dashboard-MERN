import React from 'react';
import Projects from './Project/Projects';
import { Card } from 'primereact/card';

export default function Dashboard() {
  return (
    <div className='dashboard-main'>
       <div className="card">
            <Card title="Dashboard">
            <p className='mb-2 py-6'>
              List of your projects:
            </p>
          <Projects/>
        </Card>
    </div>
    </div>
  );
}