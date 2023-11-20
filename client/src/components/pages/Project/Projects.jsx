import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
    getAllProjects,
    getAllProjectsSuccess,
    getAllProjectsFailure,
    updateProjectStart,
    updateProjectSuccess,
    updateProjectFailure
} from '../../../redux/reducers/projectSlice';
import { fetchProjects, updateProject } from "../../../api";
import { Tag } from "primereact/tag";
import { Link } from "react-router-dom";
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Message } from "primereact/message";

export default function Projects () {

  const {currentClient} = useSelector((state) => state.client);
  // const { projectItem } = useSelector((state) => state.projects);

  const [projectList, setProjectList] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [updatedProject, setUpdatedProject] = useState(null)
  const [statuses] = useState(['New', 'In Progress', 'Completed']);
  // const dispatch = useDispatch();
  const navigate = useNavigate();

      useEffect(() => {
        getProjects()
      }, [])

  const getProjects = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetchProjects();
        console.log(res.data)      
        if (res.status === 200) {
          let projects = res.data;
          if (currentClient.isAdmin) {
            setProjectList(projects)
          } else {

          let data = []
            if (projects.length) {
              projects?.map(project => {
              if (project.ownerId.includes(currentClient._id))  
                  data.push(project) 
              })
            }
            setProjectList(data)
          }
          setError(false)
          setLoading(false)  
        }
      } catch (error) {
        setError(true)
        setLoading(false)
      }
  }

  useEffect(()=> {
    if (updating && updatedProject) 
        updateProjectData();

      getProjects() 
  }, [updating])

  const updateProjectData = async () => {
    console.log(updatedProject)
    try {
      const res = await updateProject(updatedProject._id, updatedProject);
      if (res.status === 200) {
        setUpdating(false) 
      }
      navigate('/dashboard')
    } catch (error) {
      console.log(error)
      setUpdating(false) 
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

  const getStatus = (status) => {
    switch (status) {
      case 'Completed':
          return 2;
      case 'In Progress':
          return 1;
      default:
          return 0;
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
                tooltip="Show more"
                icon='pi pi-link'
                severity="info" 
                text size="small"
            />
          </Link>;
  };

  const parseDate = (rowData) => {
    return new Date(rowData.endDate).toString().substring(0, 10)
  }


const onRowEditComplete = async (e) => {

    let { newData } = e;

    setUpdatedProject(newData)  
    setUpdating(true)
};

const textEditor = (options) => {
    return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
};

const datePicker = (options) => {
  console.log(options) 
    return  <Calendar value={options.value} onChange={(e) => 
      options.editorCallback((e.target.value.toISOString())
    )}/>;
}

const statusEditor = (options) => {

  console.log(options)
    return (
        <Dropdown
            value={options.value}
            options={statuses}
            onChange={(e) => options.editorCallback((getStatus(e.value)))}

            itemTemplate={(option) => {
                return <Tag value={option} severity={getProjectSeverity(getStatus(option))}></Tag>;
            }}
        />
    );
};

  return (
    <div className="card">
      <div className="pb-4">
          <Link to='/project/create'>
            <Button 
              icon='pi pi-plus'
              label="Start a new project"
              severity="success"
              text size="small"              
              />
          </Link> 
      </div>
      {loading && <p>Loading...</p>}
       {!loading && projectList.length > 0 ?
        <div>
            <DataTable value={projectList} size="small" editMode="row" dataKey="id" 
            paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} 
            onRowEditComplete={onRowEditComplete} tableStyle={{ minWidth: '25rem' }}>

                <Column field="name" header="Name" editor={(options) => textEditor(options)}></Column>
                <Column field="description" header="Description" editor={(options) => textEditor(options)}></Column>
                <Column field="endDate" header="Due Date" body={parseDate} editor={(options) => datePicker(options)}></Column>
                <Column field="status" header="Status" body={statusBodyTemplate} editor={(options) => statusEditor(options)}></Column>
                <Column field="_id" header="Details" body={linkBodyTemplate}></Column>
                {(currentClient && currentClient.isAdmin) &&
                <Column rowEditor header="Edit"></Column>}

            </DataTable>
        </div> 
        : <div className="transition-delay-1000">
            <p className='mb-2 py-2 px-4'>
              You have no projects!
            </p>
          </div>
        }
         {error ? <Message severity="error" text={error.message}/> || 
             <Message severity="error" text="Something went wrong!"/> : null}
    </div>
  );
}