import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signedOut } from '../redux/reducers/clientSlice';
import { signOut } from '../api';
import { Avatar } from 'primereact/avatar';
import { Tooltip } from 'primereact/tooltip';


export default function Header() {

  const { currentClient} = useSelector((state) => state.client);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      dispatch(signedOut())
      navigate('/sign-in');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='navbar flex flex-row shadow-2'>
      <div className='flex justify-content-start flex-wrap align-items-center nav-left py-1'>
     
        <Link className='font-bold text-link' to='/'>
        <Tooltip target='.pi-home' className='small'>Dashboard</Tooltip>
          <span className="text-link pi pi-home px-1 mx-1 medium"></span>
        </Link>
            {currentClient && currentClient.isAdmin &&
          <Link className='px-1 text-link' to='/admin'>
             <Tooltip target='.pi-users' className='small'>Clients</Tooltip>
          <span className="pi pi-users medium mx-1"></span>
          </Link>}
          <Link className='text-link' to='/dashboard'>
          Projects
        </Link> 
        </div>
          <div className='flex justify-content-end flex-wrap nav-right align-items-center py-1'>
            {currentClient ? ( 
             <>
                <Link to='/project/create'>
                <Tooltip target='.new-project' className='small'>New Project</Tooltip>
                  <span className="text-link pi pi-plus px-1 mx-1 medium new-project"></span>
                </Link>
                <Link to='/profile'>
                <Tooltip target='.avatar-round' className='small'>Profile</Tooltip>
                  <Avatar label={(currentClient.username).at(0)} shape="circle" className='avatar-round'/>
                </Link>
                  {currentClient && (<span onClick={handleSignOut} 
                      className='cursor-pointer align-items-center log-out px-1 mx-1'>
                  <span className="text-link pi pi-sign-out medium px-1 mx-1"></span>
                </span>)}       
             </> 
            ) : ( 
              <>
                <Link className='text-link px-1 mx-1 py-1' to='/sign-in'>
                Login
                </Link>
              </>
            )}
            
        </div>
    </div>
  );
}
