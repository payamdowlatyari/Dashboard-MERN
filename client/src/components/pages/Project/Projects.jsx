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
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function Projects () {

  const { currentClient} = useSelector((state) => state.client);

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

  const setStatus = (status) => {
    switch (status) {
      case 2:
          return 'Completed';
      case 1:
          return 'In Progress';
      default:
          return 'New';
    }
  };


  const getProjectSeverity = (status) => {
    switch (status) {
        case 2:
            return 'success';
        case 1:
            return 'warning';
        default:
            return 'info';
    }
  };

  const statusBodyTemplate = (rowData) => {
    return <Tag value={setStatus(rowData.status)} severity={getProjectSeverity(rowData.status)}></Tag>;
  };

  const linkBodyTemplate = (rowData) => {
    return <Link to={`/project/${rowData._id}`}>
              <Button
                label='Details' 
                severity="info" 
                text size="small"
            />
          </Link>;
  };

  return (
    <div className="card">
      {(!projectsData || !projectsData.length) && <ProgressSpinner />}
       {projectsData.length > 0 ?
        <div>
          <p className='mb-2 py-2'>
              List of your projects:
          </p>

          <DataTable value={projectsData} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                <Column field="description" header="Description"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="endDate" header="Due Date"></Column>
                <Column field="status" header="Status" body={statusBodyTemplate}></Column>
                <Column field="_id" header="Link" body={linkBodyTemplate}></Column>
            </DataTable>
        </div> 
        : 
            <div>
            <p className='mb-2 py-2'>
              You have no projects!
            </p>

            <Link to='/project/create'>
              <Button 
              icon='pi pi-plus'
              label="Create a project"
              severity="success"
              text size="small"
              />
              </Link> 
            </div>
        }

    </div>
  );
}