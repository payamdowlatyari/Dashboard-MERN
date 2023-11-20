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

    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});

    const [selectedStatus, setSelectedStatus] = useState('')
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
      getProjectDetails()

      if (projectItem && selectedStatus === '') 
      setSelectedStatus(setStatus(projectItem.status))
      else if (selectedStatus)
        setSelectedStatus(selectedStatus)

    }, [selectedStatus])

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
        setFormData({ ...formData, status: getStatus(e.target.value)});
      } 

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    };

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
                        <Divider align="left" type="dotted">
                          <div className="inline-flex align-items-center">
                              <b>Name</b>
                          </div>
                        </Divider>
                        <div className="flex flex-initial align-items-center gap-3 py-1">
                            <InputText 
                            defaultValue={projectItem.name}
                            onChange={handleChange}
                            className="md:min-w-max" 
                            type='text'
                            id='name'
                            />
                        </div>
                        <Divider align="left" type="dotted">
                          <div className="inline-flex align-items-center">
                              <b>Description</b>                              
                          </div>
                        </Divider>
                        <div className="flex flex-wrap align-items-center gap-3 py-1">
                        <InputTextarea 
                        defaultValue={projectItem.description}
                        id="description" 
                        onChange={handleChange}
                        rows={4} cols={40} />
                        </div>
                        <Divider align="left" type="dotted">
                          <div className="inline-flex align-items-center">
                              <b>Status</b>
                          </div>
                        </Divider>
                        <div className="flex flex-wrap align-items-center gap-3 py-1">
                        <Dropdown 
                        value={selectedStatus} 
                        onChange={handleStatusChange} 
                        options={statusCode} id="status" 
                        className="w-full md:w-14rem" />
                        </div>
                    <div className="flex flex-wrap align-items-center gap-3 py-3">
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
        