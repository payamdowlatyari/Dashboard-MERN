import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signedOut } from '../redux/reducers/clientSlice';
import { toggleTheme } from '../redux/reducers/themeSlice';
import { signOut } from '../api';
import { Avatar } from 'primereact/avatar';

export default function Header() {

  const { currentClient} = useSelector((state) => state.client);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { dark } = useSelector((state) => state.theme);

  const changeMyTheme = () => {
    const newTheme = dark === true ? false : true;
    dispatch(toggleTheme(newTheme))
        
  };

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
          <span className="text-link pi pi-home px-1 mx-1 medium"></span>
        </Link>
            {currentClient && currentClient.isAdmin &&
          <Link className='px-1 text-link' to='/admin'>
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
                  <span className="text-link pi pi-plus px-1 mx-1 medium"></span>
                </Link>
                <Link to='/profile'>
                  <Avatar label={(currentClient.username).at(0)} shape="circle" className='avatar-round'/>
                </Link>
                {/* <span className={`p-3 text-link rounded cursor-pointer 
                ${dark ? 'pi pi-sun' : 'pi pi-moon'}`}
                onClick={() => changeMyTheme()} size='small'></span> */}
                  {currentClient && (<span onClick={handleSignOut} 
                      className='cursor-pointer align-items-center px-1 mx-1'>
                  <span className="text-link pi pi-sign-out medium px-1 mx-1"></span>
                </span>)}       
             </> 
            ) : ( 
              <>
                {/* <span className={`p-3 text-link rounded cursor-pointer 
                ${dark ? 'pi pi-sun' : 'pi pi-moon'}`}
                onClick={() => changeMyTheme()} size='small'></span> */}
                <Link className='text-link px-1 mx-1 py-1' to='/sign-in'>
                Login
                </Link>
              </>
            )}
            
        </div>
    </div>
  );
}
