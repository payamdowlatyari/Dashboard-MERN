import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../redux/reducers/clientSlice';
import { Avatar } from 'primereact/avatar';

export default function Header() {
  const { currentClient} = useSelector((state) => state.client);
  console.log(currentClient)
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      await fetch('/api/client/auth/signout');
      dispatch(signOut())
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='navbar bg-black txt-white'>
      <div className='flex nav-left'>
        <Link className='font-bold txt-white' to='/'>
          Home
        </Link>
        <Link className='p-h-2 txt-white' to='/dashboard'>
          Dashboard
        </Link>
        </div>
          <div className='flex nav-right'>
           {currentClient? ( 
          <span onClick={handleSignOut} 
          className='cursor-pointer txt-white'>
            <i className="fa fa-sign-out"></i>
          </span>) : (<span></span>)}       
            {currentClient ? ( 
            <Link to='/profile'>
            <Avatar image={currentClient.profilePicture} 
            shape="circle" />
            </Link>
            ) : ( 
              <Link className='font-bold txt-white' to='/sign-in'>
                Login
             </Link>
            )}
     
          </div>
    </div>
  );
}
