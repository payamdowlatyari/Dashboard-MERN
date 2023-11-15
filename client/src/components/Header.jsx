import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../redux/reducers/clientSlice';

export default function Header() {
  const { currentClient} = useSelector((state) => state.client);

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
    <div className='navbar bg-black txt-white flex flex-row'>
      <div className='flex justify-content-start flex-wrap align-items-center nav-left'>
        <Link className='font-bold txt-white' to='/'>
          Home
        </Link>
        <Link className='p-h-2 txt-white' to='/dashboard'>
          Dashboard
        </Link>
        </div>
          <div className='flex justify-content-end flex-wrap nav-right align-items-center'>
          
            {currentClient ? ( 
             <>
                <Link to='/project/create'>
                  <span className="txt-white pi pi-plus p-h-1 medium"></span>
                </Link>
                <Link to='/profile'>
                  <span className="txt-white pi pi-user p-h-1 medium"></span>
                </Link>
             </> 
           
            ) : ( 
              <Link className='font-bold txt-white p-h-1' to='/sign-in'>
                Login
             </Link>
            )}
             {currentClient? ( 
            <span onClick={handleSignOut} 
            className='cursor-pointer align-items-center p-h-1'>
            <span className="txt-white pi pi-sign-out p-h-1 medium"></span>
          </span>) : (<span></span>)}       
        </div>
    </div>
  );
}
