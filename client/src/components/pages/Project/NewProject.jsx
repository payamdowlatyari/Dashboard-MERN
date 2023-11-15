import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createNewProject } from '../../../api';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { InputTextarea } from "primereact/inputtextarea";
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';

export default function NewProject() {

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const { currentClient } = useSelector((state) => state.client);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        ownerId: [currentClient._id]
    });

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    };
  
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          setLoading(true);
          setError(false);
            const res = await createNewProject(formData);
            if (res.status !== 201) {
                setLoading(false); 
                setError(true); 
              return;
            }
            navigate('/dashboard')
          } catch (error) {
            setLoading(false);
            setError(true);
          }
    };


    return (
        <div className='main'>
        <div className="card">
             <Card title="New Project">
            <div className="flex flex-initial sm:flex-row align-content-center">
            <form onSubmit={handleSubmit} className="gap-2 w-auto">     
            
                        <label htmlFor="name" className="block mb-2">Choose a name for the project</label>
                        <div className="flex flex-initial align-items-center gap-3 py-3">

                            <InputText 
                            onChange={handleChange}
                            className="md:min-w-max" 
                            type='text'
                            placeholder="Enter project name"
                            id='name'
                            />
                        </div>
                        <Divider/>
                        <label htmlFor="description" className="block mb-2">Briefly explain what the project is about.</label>

                        <div className="flex flex-wrap align-items-center gap-3 py-3">

                        <InputTextarea 
                        id="description" 
                        placeholder='Description'
                        onChange={handleChange}
                        rows={5} cols={50} />
                        </div>
                        <div className="flex flex-wrap align-items-center">
                    <Button 
                    disabled={loading}
                    label={loading ? 'Loading...' : 'Submit'} 
                    type="submit" 
                    size="small" 
                    className='w-full'
                    />      
                    </div> 
            </form>
            {error ? <Message severity="error" text={error.message}/> || 
             <Message severity="error" text="Something went wrong!"/> : null}
            </div>
            </Card>
        </div>
        </div>
    )
}
        