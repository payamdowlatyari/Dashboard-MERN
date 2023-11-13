import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllProjects,
    getAllProjectsSuccess,
    getAllProjectsFailure
} from '../../../redux/reducers/projectSlice';
import { fetchProjects } from "../../../api";
import { Tag } from "primereact/tag";
import { Link } from "react-router-dom";
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';


export default function Projects () {

const { currentClient, loading} = useSelector((state) => state.client);

console.log(currentClient)

const [projectsData, setProjectsData] = useState([]);

const dispatch = useDispatch();

    useEffect(() => {
      getProjects()
    }, [])

const getProjects = async () => {
    try {
      dispatch(getAllProjects());
      const res = await fetchProjects();
      console.log(res.data)      
      if (res.status === 200) {
        let projects = res.data;
        dispatch(getAllProjectsSuccess(projects));

        
        let data = []
        if (projects.length) {
            projects?.map(project => {
             if (project.ownerId.includes(currentClient._id))  
                data.push(project) 
            })
        }
        setProjectsData(data)  
      }
    } catch (error) {
      dispatch(getAllProjectsFailure());
    }
}


  return (
    <div className="card">
       {projectsData.length > 0 ?
        <div>
          <p className='mb-2 py-6'>
              List of your projects:
          </p>

        <table>
          <thead className="bg-black txt-white">
          <tr>
            <th>Project Name</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Status</th>
          </tr>
          </thead>
              {(projectsData?.map(project => (
                <tbody key={project._id}>
                  <tr>
                    <td>
                    <Link 
                    to={`/project/${project._id}`}> 
                    
                    <Button 
                    label={project.name} 
                    severity="info" 
                    text size="small"
                    />

                    </Link>
                    </td>
                    <td>
                    {project.description} 
                    </td>
                    <td>
                    {project.endDate.substring(0, 10)} 
                    </td>
                    <td>
                    {project.status === 2 ? 
                    <Tag severity="success" value="Completed"></Tag>
                    : (project.status === 1 ? 
                        <Tag value="In Progress" severity='warning'></Tag>: 
                        <Tag severity="secondary" value="New"></Tag>)}
                    </td>
                </tr>
            </tbody>
                ))
              )}
        </table> 
        </div> 
        : 
            <p className='mb-2 py-6'>
              You have no projects!
            </p>
      }
      {!projectsData && <ProgressSpinner />}
    </div>
  );
}