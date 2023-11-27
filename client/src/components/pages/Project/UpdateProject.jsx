import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProjectById, updateProject } from '../../../api';
import {
    getProjectStart,
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
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';

export default function UpdateProject() {

    const { projectItem, loading, error } = useSelector((state) => state.projects);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});
    const [date, setDate] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('')
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
      getProjectDetails()

      if (projectItem && selectedStatus === '') 
        setSelectedStatus(setStatus(projectItem.status))
      else if (selectedStatus)
        setSelectedStatus(selectedStatus)

        if (projectItem && date === null) {
          const currentDate = new Date(projectItem.endDate)
          setDate(currentDate)
        }
       
    }, [selectedStatus, date])

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
        setFormData({ ...formData, status: getStatus(e.target.value)});
      } 
    
    const handleDateChange = (e) => {      
        setDate((e.target.value));
        setFormData({ ...formData, endDate: parseDate(e.target.value) });
      }

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const getProjectDetails = async () => {
      try {
          dispatch(getProjectStart());
          const res = await getProjectById(id);
        if (res.status === 200) {
          dispatch(getProjectSuccess(res.data));
        }

      } catch (error) {
          dispatch(getProjectFailure(error));
      }
  }

  const parseDate = (endDate) => {
    return new Date(endDate).toISOString()
  }

    const statusCode = ['Completed', 'In Progress', 'Requested']
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
              return 'Requested';
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
            navigate(`/project/${id}`)
          } catch (error) {
            dispatch(updateProjectFailure(error))
          }
    };

    return (
        <div className='main'>
        <div className="card">
             <Card title="Update Project">
                <div className="flex md:align-content-start flex-wrap">
                    <form onSubmit={handleSubmit} className="gap-2 w-auto">     
                        <div className="flex flex-row align-items-start gap-3 py-1">
                          <div className="flex flex-column align-items-start gap-3 py-1">
                            <div className="inline-flex">
                                <b>Name</b>
                            </div>
                            <InputText 
                                defaultValue={projectItem.name}
                                onChange={handleChange}
                                className="md:min-w-max" 
                                type='text'
                                id='name'
                                />
                            </div>
                            </div>
                            <div className="flex flex-row align-items-start gap-3 py-1">
                            <div className="flex flex-column align-items-start gap-3 py-1">
                            <div className="inline-flex">
                                  <b>Description</b>                              
                              </div>  
                            <InputTextarea 
                            defaultValue={projectItem.description}
                            id="description" 
                            onChange={handleChange}
                            autoResize
                            rows={3} cols={30} />
                            </div>
                            </div>
                            <div className="flex flex-row align-items-start gap-3 py-1">
                            <div className="flex flex-column align-items-start gap-3 py-1">
                            <div className="inline-flex">
                                  <b>Status</b>
                              </div>
                            <Dropdown 
                            value={selectedStatus} 
                            onChange={handleStatusChange} 
                            options={statusCode} id="status" 
                            className="w-full md:w-14rem" />
                            </div>          
                            <div className="flex flex-column align-items-start gap-3 py-1">
                            <div className="inline-flex">
                              <b>Due Date</b>
                            </div>
                            <Calendar value={date} id='endDate'
                            onChange={handleDateChange} />
                          </div>
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
        