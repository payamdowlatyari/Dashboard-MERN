import React from "react";
import { Card } from 'primereact/card';
import Clients from "./Admin/Clients";

export default function Admin () {
    return (
        <div className='main'>
            <div className="card">
                <Card title="Admin">
                    <Clients/>
                </Card>
            </div>
        </div>
    );
}
