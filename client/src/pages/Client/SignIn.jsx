import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signIn } from '../../api';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../../redux/reducers/clientSlice';
import { useDispatch, useSelector } from 'react-redux';
// import OAuth from '../components/OAuth';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Card } from 'primereact/card';

export default function SignIn() {

  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.client);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await signIn(formData);
      console.log(res)
      if (res.status !== 200) {
        dispatch(signInFailure(res.data));
        return;
      }
      dispatch(signInSuccess(res.data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
  return (
    <div className="card">
       <Card title="Sign In">
            <div className="flex flex-column md:flex-row">
                <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                <form onSubmit={handleSubmit}>  
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <InputText 
                          onChange={handleChange}
                          className="w-12rem" 
                          type='email'
                          placeholder='Email'
                          id='email'
                          />
                    </div>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <InputText 
                          id="password" 
                          type="password" 
                          className="w-12rem"
                          placeholder='Password'
                          onChange={handleChange}
                           />
                    </div>
                    <Button 
                      // disabled={loading}
                      label={loading ? 'Loading...' : 'Sign In'} 
                      icon="pi pi-user" 
                      className="w-10rem mx-auto"
                      severity="info" 
                      text
                      ></Button>
                      {/* <OAuth /> */}
                  </form>
                </div>
                <div className="w-full md:w-2">
                    {/* <Divider layout="vertical" className="hidden md:flex">
                        <b>OR</b>
                    </Divider> */}
                    <Divider layout="horizontal" className="flex md:hidden" align="center">
                        <b>OR</b>
                    </Divider>
                </div>
                <div className="w-full md:w-5 flex align-items-center justify-content-center py-5">
                <Link 
                to='/sign-up'>Sign Up</Link>
                {error ? <Message severity="error" text={error.message}/> || 
                <Message severity="error" text="Something went wrong!"/> : ''}
                </div>
            </div>
            </Card>
        </div>
  );
}
