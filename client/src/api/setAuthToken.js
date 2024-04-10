import axios from 'axios';

const setAuthToken = token =>{

    if (token) {
        // Apply authorization token to every request if logged in
        axios.defaults.headers.common["Authorization"] = token;
      } else {
        // Delete auth header
        delete axios.defaults.headers.common["Authorization"];
      }
    // if (token){

    //     console.log(token)
    //     // axios.defaults.headers.common['x-auth-token']= token;
    //     axios.defaults.headers.common = {'Authorization': `bearer ${token}`}

    // }
    // else{
    //     delete axios.defaults.headers.common['x-auth-token']
    // }
}
export default setAuthToken;