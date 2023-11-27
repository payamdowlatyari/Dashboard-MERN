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
      if (res.status === 200) {
        dispatch(signInSuccess(res.data));
        navigate('/');
      }
      
    } catch (error) {
      console.log(error)
      dispatch(signInFailure(error.response.data));
    }
  };
  return (
    <div className='main'> 
      <div className="card">
       <Card title="Sign In">
            <div className="flex flex-column md:flex-row align-content-center py-6">
                <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3">
                <form onSubmit={handleSubmit}>  
                    <div className="flex flex-wrap justify-content-center align-items-center gap-3 pb-4">
                    <span className="p-float-label">
                        <InputText 
                          onChange={handleChange}
                          className="w-15rem" 
                          type='email'
                          id='email'
                          />
                          <label htmlFor="email">Email</label>
                      </span>
                    </div>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-3 pb-4">
                    <span className="p-float-label">
                        <InputText 
                          id="password" 
                          type="password" 
                          className="w-15rem"
                          onChange={handleChange}
                           />
                          <label htmlFor="password">Password</label>
                    </span>
                    </div>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-3">
                    <Button 
                      disabled={loading}
                      label={loading ? 'Loading...' : 'Sign In'} 
                      className="w-15rem"
                      severity="info" 
                      icon="pi pi-user"
                      size="small"
                      ></Button>
                      </div>
                      {/* <OAuth /> */}
                  </form>
                  {error ? <Message severity="error" text={error.message}/> || 
                <Message severity="error" text="Something went wrong!"/> : ''}
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
                  severity="danger" 
                  size="small"
                  icon="pi pi-user-plus"
                  />
                </Link>
                </div>
            </div>
            </Card>
          </div>
        </div>
  );
}
