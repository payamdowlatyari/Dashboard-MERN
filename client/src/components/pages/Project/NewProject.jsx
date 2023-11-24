import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createNewProject } from '../../../api';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { InputTextarea } from "primereact/inputtextarea";
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';

export default function NewProject() {

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const { currentClient } = useSelector((state) => state.client);
    const [date, setDate] = useState(new Date());
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        dueDate: new Date(),
        ownerId: [currentClient._id]
    });


    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleDateChange = (e) => {      
      setDate((e.target.value));
      setFormData({ ...formData, endDate: (e.target.value) });
    }
  
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
                <label htmlFor="name" className="block mb-2">Choose a name for the project.</label>
                    <div className="flex flex-initial align-items-center gap-3 py-3">
                        <InputText 
                          onChange={handleChange}
                          className="md:min-w-max" 
                          type='text'
                          placeholder="Enter project name"
                          id='name'
                          />
                        </div>
                        <label htmlFor="description" className="block mb-2">Briefly explain what the project is about.</label>
                        <div className="flex flex-wrap align-items-center gap-3 py-3">
                        <InputTextarea 
                          id="description" 
                          placeholder='Description'
                          onChange={handleChange}
                          rows={5} cols={50} />
                        </div>
                        <div className="flex flex-column align-items-start gap-3 py-1">
                            <div className="inline-flex">
                              Select a due date.
                            </div>
                            <Calendar value={date} id='endDate'
                            onChange={handleDateChange} />
                          </div>
                        <div className="flex flex-row align-items-start gap-3 py-1">
                        <Button 
                          disabled={loading}
                          label={loading ? 'Loading...' : 'Submit'} 
                          severity='success'
                          type="submit" 
                          size="small" 
                          className='w-full'
                          icon="pi pi-check"
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
        