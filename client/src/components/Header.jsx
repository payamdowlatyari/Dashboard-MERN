import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signedOut } from '../redux/reducers/clientSlice';
import { signOut } from '../api';

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
    <div className='navbar bg-black txt-white flex flex-row'>
      <div className='flex justify-content-start flex-wrap align-items-center nav-left'>
        <Link className='font-bold txt-white' to='/'>
          <span className="txt-white pi pi-home p-h-1 medium"></span>
        </Link>
            {currentClient && currentClient.isAdmin &&
          <Link className='p-h-1 txt-white' to='/admin'>
          <span className="pi pi-users mid-large"></span>
          </Link>}
          <Link className='txt-white' to='/dashboard'>
          Projects
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
             {currentClient && (<span onClick={handleSignOut} 
                  className='cursor-pointer align-items-center p-h-1'>
            <span className="txt-white pi pi-sign-out p-h-1 medium"></span>
          </span>)}       
        </div>
    </div>
  );
}
