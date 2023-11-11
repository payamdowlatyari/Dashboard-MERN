import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../../api'; 
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';

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
      console.log(res);
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
    <div className="card">
    <Card title="Sign Up">
         <div className="flex flex-wrap">
             <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
             <form onSubmit={handleSubmit}>  
                 <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                     <InputText 
                       onChange={handleChange}
                       className="w-12rem" 
                       type='text'
                       placeholder='Username'
                       id='username'
                       />
                 </div>
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
                   disabled={loading}
                   label={loading ? 'Loading...' : 'Sign Up'} 
                   className="mx-auto"
                   severity="info" 
                   size="small"
                   text raised
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
             to='/sign-in'>
            <Tag severity="info" 
              value="Sign In">
              </Tag>
             </Link>
          
             {error ? <Message severity="error" text={error.message}/> || 
             <Message severity="error" text="Something went wrong!"/> : null}
             </div>
         </div>
         </Card>
     </div>
  );
}
