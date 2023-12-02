import axios from 'axios'

let url = process.env.REACT_APP_API;
if (process.env.NODE_ENV === "development") 
    url = 'http://localhost:8000';

// api/auth
export const signIn =(formData)=> axios.post(`${url}/api/auth/signin`, formData, { withCredentials: true })
export const signUp =(formData)=> axios.post(`${url}/api/auth/signup`, formData, { withCredentials: true })
export const signOut = () => axios.get(`${url}/api/auth/signout`);

// api/client
export const profileUpdate = (id, formData) => axios.post(`${url}/api/client/update/${id}`, formData, { withCredentials: true });

// api/project
export const fetchProjects = () => axios.get(`${url}/api/project`);
export const getProjectById = (id) => axios.get(`${url}/api/project/${id}`);
export const getProjectsByOwner = (ownerId) => axios.get(`${url}/api/project/owner/${ownerId}`);
export const createNewProject = (formData) => axios.post(`${url}/api/project/create`, formData, { withCredentials: true })
export const addNewComment = (id, comment) => axios.put(`${url}/api/project/comment/${id}`, comment, { withCredentials: true })

// api/admin/client 
export const getClientById = (id) => axios.get(`${url}/api/admin/client/${id}`);
export const fetchClients = () => axios.get(`${url}/api/admin/client`);
export const updateClient = (id, formData) => axios.post(`${url}/api/admin/client/update/${id}`, formData, { withCredentials: true });
export const deleteClientById = (id) => axios.delete(`${url}/api/admin/client/delete/${id}`, { withCredentials: true })

// api/admin/project
export const updateProject = (id, formData) => axios.post(`${url}/api/admin/project/update/${id}`, formData, {withCredentials: true})
export const deleteProjectById = (id) => axios.delete(`${url}/api/admin/project/delete/${id}`, { withCredentials: true })
