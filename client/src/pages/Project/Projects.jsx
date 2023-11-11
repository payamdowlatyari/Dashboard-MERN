import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllProjects,
    getAllProjectsSuccess,
    getAllProjectsFailure
} from '../../redux/reducers/projectSlice';
import { fetchProjects } from "../../api";
import Project from "./Project";

export default function Projects () {

const { currentClient} = useSelector((state) => state.client);
console.log(currentClient)

const [projectsData, setProjectsData] = useState([]);

const dispatch = useDispatch();

    useEffect(() => {
      getProjects()
        // setProjectsData(getProjects())
    }, [])

const getProjects = async () => {
    try {
      dispatch(getAllProjects());
      const res = await fetchProjects();
      console.log(res.data)      
      if (res.status === 200) {
        dispatch(getAllProjectsSuccess());

        // return res.data;
        setProjectsData(res.data)
      }
    } catch (error) {
      dispatch(getAllProjectsFailure());
    }
}

  return (
    <div className="card">
        <table>
          <thead className="bg-black txt-white">
          <tr>
            <th>Project Name</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>Due Date</th>
            <th>Status</th>
          </tr>
          </thead>
          
            {projectsData.length > 0 && 
              (  
                projectsData?.map(project => (
                  //  (project.ownerId.includes(currentClient._id)) && 
                    <Project 
                        key={project._id}
                        project={project}
                    /> 
                )) 
              )
            }
        </table>

    </div>
  );
}