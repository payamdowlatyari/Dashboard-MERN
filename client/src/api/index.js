import axios from 'axios'

let url = process.env.REACT_APP_API;
if (process.env.NODE_ENV === "development") 
    url = 'http://localhost:8000';

// client auth
export const signIn =(formData)=> axios.post(`${url}/api/client/auth/signin`, formData, { withCredentials: true })
export const signUp =(formData)=> axios.post(`${url}/api/client/auth/signup`, formData, { withCredentials: true })
export const signOutClinet = () => axios.get(`${url}/api/client/auth/signout`);

// client
export const getClientById = (id) => axios.get(`${url}/api/client/${id}`);
export const fetchClients = () => axios.get(`${url}/api/client`);
export const profileUpdate = (id, formData) => axios.post(`${url}/api/client/update/${id}`, formData, { withCredentials: true });
export const updateClient = (id, formData) => axios.post(`${url}/api/client/admin/update/${id}`, formData, { withCredentials: true });
export const deleteClientById = (id) => axios.delete(`${url}/api/client/admin/delete/${id}`, { withCredentials: true })

// project
export const fetchProjects = () => axios.get(`${url}/api/project`);
export const getProjectById = (id) => axios.get(`${url}/api/project/${id}`);
export const createNewProject = (formData) => axios.post(`${url}/api/project`, formData, { withCredentials: true })
export const addNewComment = (id, comment) => axios.put(`${url}/api/project/comment/${id}`, comment, { withCredentials: true })
export const updateProject = (id, formData) => axios.post(`${url}/api/project/update/${id}`, formData, {withCredentials: true})
