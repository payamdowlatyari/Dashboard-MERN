import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import {
    getAllProjects,
    getAllProjectsSuccess,
    getAllProjectsFailure
} from '../../redux/reducers/projectSlice';
import Project from "./Project";

export default function Projects () {

const [projectsData, setProjectsData] = useState({});
const dispatch = useDispatch();

    useEffect(() => {
        getProjects()
    }, [])

const getProjects = async () => {
    try {
      dispatch(getAllProjects());
      const res = await fetch('/api/project', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      console.log(data)
      if (data.success === false) {
        dispatch(getAllProjectsFailure());
        return;
      }
      dispatch(getAllProjectsSuccess());
      setProjectsData(data)

    } catch (error) {
      dispatch(getAllProjectsFailure());
    }
}

  return (
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
                        <Project 
                            key={project._id}
                            project={project}
                        />
                    )) 
                  )
                }
            </table>
  );
}