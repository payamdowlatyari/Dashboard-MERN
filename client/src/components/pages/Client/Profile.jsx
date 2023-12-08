import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateClientStart,
  updateClientSuccess,
  updateClientFailure,
} from '../../../redux/reducers/clientSlice';
import { profileUpdate } from '../../../api'; 
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import { Card } from 'primereact/card';

export default function Profile() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { currentClient, loading, error } = useSelector((state) => state.client);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateClientStart());
      const res = await profileUpdate(currentClient._id, formData);
      console.log(res)
      if (res.status !== 200) {
        dispatch(updateClientFailure(res.data));
        return;
      }
      dispatch(updateClientSuccess(res.data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateClientFailure(error));
    }
  };

  return (
    <div className='main'>
      <div className="card">
            <Card title="Profile">
            <div className="flex flex-column md:flex-row align-content-center">
            <div className="w-full flex flex-column align-items-center justify-content-center gap-3 py-5">

      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap justify-content-center align-items-center gap-3 py-1">
        <InputText
          defaultValue={currentClient.username}
          type='text'
          id='username'
          placeholder='Username'
          className="w-full"
          onChange={handleChange}
        />
        </div>
        <div className="flex flex-wrap justify-content-center align-items-center gap-3 py-1">
        <InputText
          defaultValue={currentClient.email}
          type='email'
          id='email'
          placeholder='Email'
          className="w-full"
          onChange={handleChange}
        />
        </div>
        <div className="flex flex-wrap justify-content-center align-items-center gap-3 py-1">
          <span className='p-float-label w-full'>
        <InputText
          type='password'
          id='password'
          className="w-full"
          onChange={handleChange}
        /> <label htmlFor="password">Password</label>
        </span>
        </div>
        <div className="flex flex-wrap justify-content-center align-items-center gap-3 py-1">
        <Button 
          severity='success'
          className="mx-auto w-full"
          label={loading ? 'Loading...' : 'Update'} 
          size="small"
          />
        </div>
      </form>
      </div>
        <div className='p-messages'>
        {error && <Message severity="error" text="Something went wrong!" />}
        {updateSuccess && <Message severity="success" text="Profile is updated successfully!" />}
        </div>
        </div>
        </Card>
        </div>
    </div>
  );
}
