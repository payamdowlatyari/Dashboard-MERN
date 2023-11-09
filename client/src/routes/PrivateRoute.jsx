import {useSelector} from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

export default function PrivateRoute() {
    const {currentClient} = useSelector(state => state.client)
  return currentClient ? <Outlet/> : <Navigate to='/sign-in'/>
}
