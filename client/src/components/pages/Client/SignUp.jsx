import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../../../api'; 
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Card } from 'primereact/card';
// import OAuth from '../../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(false);

      const res = await signUp(formData);
      setLoading(false);
      if (res.status !== 201) {
        setError(true);
        return;
      }
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  return (
    <div className='main'> 
       <div className="card">
        <Card title="Sign Up">
        <div className="flex flex-column md:flex-row align-content-center">
             <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
             <form onSubmit={handleSubmit}>  
                 <div className="flex flex-wrap justify-content-center align-items-center gap-3">
                     <InputText 
                       tooltip="Enter your username"
                       onChange={handleChange}
                       className="w-full" 
                       type='text'
                       placeholder='Username'
                       id='username'
                       />
                 </div>
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
                   label={loading ? 'Loading...' : 'Sign Up'} 
                   className="mx-auto w-full"
                   severity="info" 
                   size="small"
                   text raised
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
              to='/sign-in'>
                <Button 
                  label='Sign In'
                  severity="secondary" 
                  text 
                  size="small"
                  />
             </Link>
          
             {error ? <Message severity="error" text={error.message}/> || 
             <Message severity="error" text="Something went wrong!"/> : null}
             </div>
         </div>
         </Card>
        </div>
     </div>
  );
}
