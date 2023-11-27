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
        <div className="flex flex-column md:flex-row align-content-center py-5">
             <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
             <form onSubmit={handleSubmit}>  
                 <div className="flex flex-wrap justify-content-center align-items-center gap-3 pb-4">
                 <span className="p-float-label">
                     <InputText 
                       onChange={handleChange}
                       className="w-15rem" 
                       type='text'
                       id='username'
                       />
                      <label htmlFor="username">Username</label>
                 </span>
                 </div>
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
                 <div className="flex flex-wrap justify-content-center align-items-center gap-3 pb-4">
                 <Button 
                   disabled={loading}
                   label={loading ? 'Loading...' : 'Sign Up'} 
                   className="w-15rem" 
                   icon="pi pi-user-plus"
                   severity="info" 
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
              to='/sign-in'>
                <Button 
                  label='Sign In'
                  severity="danger" 
                  icon="pi pi-user"
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
