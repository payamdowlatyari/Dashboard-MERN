import { Card } from 'primereact/card';

export default function NotFound(){
  return (
    <div
      className="card main">
        <Card title="404">
            <p className="txt-dark-gray">
                Page Not Found!
            </p>
        </Card>
    </div>
  );
};

