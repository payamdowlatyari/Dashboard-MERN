import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../redux/reducers/clientSlice';

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
    <div className='bg-black txt-white'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
      <div className='flex'>
        <Link to='/'>
          <h1 className='font-bold txt-white'>Logo</h1>
        </Link>
        <Link to='/dashboard'>
          <h1 className='p-h-2 txt-white'>Dashboard</h1>
        </Link>
        </div>
          <div className='flex'>
           {currentClient? ( 
          <span onClick={handleSignOut} className='cursor-pointer p-h-2'>
          <i className="fa fa-sign-out"></i>
          </span>) : (<span></span>)} 
          <Link to='/profile'>
            {currentClient ? (
              <img src={currentClient.profilePicture} alt='profile' className='h-7 w-7 rounded-full object-cover' />
            ) : (
              <span>Sign In</span>
            )}
          </Link>
          </div>
      </div>
    </div>
  );
}
