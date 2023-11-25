import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  editClientStart,
  editClientSuccess,
  editClientFailure,
} from '../../../redux/reducers/adminSlice';
import { getClientById, updateClient } from '../../../api'; 
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import { Card } from 'primereact/card';
import { InputSwitch } from 'primereact/inputswitch'

export default function EditClient() {

  const dispatch = useDispatch();
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [clientItem, setclientItem] = useState({});

  const {error, loading } = useSelector((state) => state.admin);
  const [checked, setChecked] = useState(null);

    useEffect(() => {   
       getClient();  
    }, [])
 
  const handleAdminSwitch = (e) => {
    setChecked(e.target.value);
    setFormData({ ...formData, [e.target.id]: e.target.value});
  } 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value});
  };

  const getClient = async () => {
   
    try {
        const res = await getClientById(id);
        if (res.status === 200) {
           setclientItem(res.data)
        }
        setChecked(res.data.isAdmin)
        
      } catch (error) {
        console.log(error)
      }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(editClientStart());
      const res = await updateClient(clientItem._id, formData);
      console.log(res)
      if (res.status !== 200) {
        dispatch(editClientFailure(res.data));
        return;
      }
      dispatch(editClientSuccess(res.data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(editClientFailure(error));
    }
  };

  return (
    <div className='main'>
      <div className="card">
            <Card title="Edit Client">
            <div className="flex flex-column md:flex-row align-content-center">
            <div className="w-full flex flex-column align-items-center justify-content-center gap-3 py-5">

      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap justify-content-center align-items-center gap-3 py-1">
        <InputText
          defaultValue={clientItem.username}
          type='text'
          id='username'
          placeholder='Username'
          className="w-full"
          onChange={handleChange}
        />
        </div>
        <div className="flex flex-wrap justify-content-center align-items-center gap-3 py-1">
        <InputText
          defaultValue={clientItem.email}
          type='email'
          id='email'
          placeholder='Email'
          className="w-full"
          onChange={handleChange}
        />
        </div>
        <div className="flex flex-wrap justify-content-center align-items-center gap-3 py-1">
        <InputText
          type='password'
          id='password'
          placeholder='Password'
          className="w-full"
          onChange={handleChange}
          disabled
        />
        </div>
        <div className="flex flex-wrap justify-content-center align-items-center gap-3 py-1">
        <span className="text-600 text-sm">Admin: </span>
        <InputSwitch id='isAdmin' checked={checked} onChange={handleAdminSwitch} />
        </div>
        <div className="flex flex-wrap justify-content-center align-items-center gap-3 py-1">
        <Button 
          severity='success'
          className="mx-auto w-full"
          label={loading ? 'Loading' : 'Update'} 
          size="small"
          />
        </div>
      </form>
      {error && <Message severity="error" text="Something went wrong!" />}
        {updateSuccess && <Message severity="success" text="Profile is updated successfully!" />}
      </div>
        </div>
        </Card>
        </div>
    </div>
  );
}
