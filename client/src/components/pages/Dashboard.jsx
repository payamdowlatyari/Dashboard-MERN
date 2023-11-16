import React from 'react';
import Projects from './Project/Projects';
import { Card } from 'primereact/card';

export default function Dashboard() {
  return (
    <div className='main'>
       <div className="card">
          <Card title="Projects">
            <Projects/>
          </Card>
      </div>
    </div>
  );
}