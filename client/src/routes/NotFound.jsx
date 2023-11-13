import { Card } from 'primereact/card';

export default function NotFound(){
  return (
    <div
      className="card">
        <Card title="404">
            <p className="m-0">
                Page Not Found!
            </p>
        </Card>
    </div>
  );
};

