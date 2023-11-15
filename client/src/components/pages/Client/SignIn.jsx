import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signIn } from '../../../api';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../../../redux/reducers/clientSlice';
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
    <div className='main'> 
      <div className="card">
       <Card title="Sign In">
            <div className="flex flex-column md:flex-row align-content-center">
                <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                <form onSubmit={handleSubmit}>  
                    <div className="flex flex-wrap justify-content-center align-items-center gap-3">
                        <InputText 
                          tooltip="Enter your email"
                          onChange={handleChange}
                          className="w-full" 
                          type='email'
                          placeholder='Email'
                          id='email'
                          />
                    </div>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-3">
                        <InputText 
                          tooltip="Enter your password"
                          id="password" 
                          type="password" 
                          className="w-full"
                          placeholder='Password'
                          onChange={handleChange}
                           />
                    </div>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-3">
                    <Button 
                      disabled={loading}
                      label={loading ? 'Loading...' : 'Sign In'} 
                      className="mx-auto w-full"
                      severity="info" 
                      text raised
                      size="small"
                      ></Button>
                      </div>
                      {/* <OAuth /> */}
                  </form>
                </div>
                <div className="w-full md:w-2">
                  <Divider layout="vertical" className="hidden md:flex">
                    <b>OR</b>
                  </Divider>
                  <Divider layout="horizontal" className="flex md:hidden" align="center">
                    <b>OR</b>
                  </Divider>
                </div>
                <div className="w-full md:w-5 flex align-items-center justify-content-center gap-3 py-5">
                <Link 
                className='opacity-100'
                to='/sign-up'>     
                  <Button 
                  label='Sign Up'
                  severity="secondary" 
                  text 
                  size="small"
                  />
                </Link>
                {error ? <Message severity="error" text={error.message}/> || 
                <Message severity="error" text="Something went wrong!"/> : ''}
                </div>
            </div>
            </Card>
          </div>
        </div>
  );
}
