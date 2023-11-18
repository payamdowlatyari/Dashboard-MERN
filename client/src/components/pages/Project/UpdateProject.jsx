import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProjectById, updateProject } from '../../../api';
import {
    getProject,
    getProjectSuccess,
    getProjectFailure,
    updateProjectStart,
    updateProjectSuccess,
    updateProjectFailure
} from '../../../redux/reducers/projectSlice';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { InputTextarea } from "primereact/inputtextarea";
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';

export default function UpdateProject() {

    const { projectItem, loading, error } = useSelector((state) => state.projects);

    console.log(projectItem)

    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});

    const [selectedStatus, setSelectedStatus] = useState(null)
    const navigate = useNavigate();
    const { id } = useParams();

    const handleStatusChange = (e) => {

        setSelectedStatus(getStatus(e.target.value));

        console.log(selectedStatus)
        console.log(formData)
        setFormData({ ...formData, [e.target.id]: e.target.value});
      } 

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    };
  
    useEffect(() => {
        getProjectDetails()
    }, [])

    const getProjectDetails = async () => {
      try {
          dispatch(getProject());
          const res = await getProjectById(id);
        if (res.status === 200) {
          dispatch(getProjectSuccess(res.data));
        }

      } catch (error) {
          dispatch(getProjectFailure(error));
      }
  }

    const statusCode = ['Completed', 'In Progress', 'New']
    const getStatus = (status) => {
        switch (status) {
          case 'Completed':
              return 2;
          case 'In Progress':
              return 1;
          default:
              return 0;
        }
      };

      const setStatus = (code) => {
        switch (code) {
          case 2:
              return 'Completed';
          case 1:
              return 'In Progress';
          default:
              return 'New';
        }
      };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatch(updateProjectStart())
            const res = await updateProject(id, formData);
            if (res.status === 200) {
                dispatch(updateProjectSuccess(res.data))
            }
            navigate('/dashboard')
          } catch (error) {
            dispatch(updateProjectFailure(error))
          }
    };

    return (
        <div className='main'>
        <div className="card">
             <Card title="Update Project">
            <div className="flex flex-initial sm:flex-row align-content-center">
            <form onSubmit={handleSubmit} className="gap-2 w-auto">     
            
                        <label htmlFor="name" className="block mb-2">Name</label>
                        <div className="flex flex-initial align-items-center gap-3 py-3">

                            <InputText 
                            defaultValue={projectItem.name}
                            onChange={handleChange}
                            className="md:min-w-max" 
                            type='text'
                            id='name'
                            />
                        </div>
                        <Divider/>
                        <label htmlFor="description" className="block mb-2">Description</label>
                        <div className="flex flex-wrap align-items-center gap-3 py-3">
                        <InputTextarea 
                        defaultValue={projectItem.description}
                        id="description" 
                        onChange={handleChange}
                        rows={5} cols={50} />
                        </div>

                        <div className="flex flex-wrap align-items-center gap-3 py-3">
                        <Dropdown 
                        value={setStatus(projectItem.status)} 
                        onChange={handleStatusChange} 
                        options={statusCode} id="status" 
                        className="w-full md:w-14rem" />
                        </div>
                        <div className="flex flex-wrap align-items-center">
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
        