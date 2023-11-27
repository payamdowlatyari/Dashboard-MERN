import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProjects, updateProject } from "../../../api";
import { Tag } from "primereact/tag";
import { Link } from "react-router-dom";
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";

export default function Projects () {

  const {currentClient} = useSelector((state) => state.client);
  const [projectList, setProjectList] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [updatedProject, setUpdatedProject] = useState(null)
  const [statuses] = useState(['Requested', 'In Progress', 'Completed']);
  const [globalFilter, setGlobalFilter] = useState(null);


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
          return 'Requested';
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
                icon='pi pi-comment'
                label={rowData.comments.length > 0 ? rowData.comments.length : '0'}
                text rounded 
                size="small"
            />
          </Link>;
  };

  const parseDate = (rowData) => {
    return new Date(rowData.endDate).toISOString().substring(0, 10)
  }

  const descriptionBodyTemplate = (rowData) => {
    return <span className="mid-small">{(rowData.description).substring(0, 20)}...</span>;
  }

  const onRowEditComplete = async (e) => {
      let { newData } = e;
      setUpdatedProject(newData)  
      setUpdating(true)
  };

  const textEditor = (options) => {
      return <InputText type="text" className="p-inputtext-sm" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
  };

  const statusEditor = (options) => {
      return (
          <Dropdown
              value={setStatus(options.value)}
              options={statuses}
              onChange={(e) => options.editorCallback((getStatus(e.value)))}
              itemTemplate={(option) => {
                  return <Tag value={option} severity={getProjectSeverity(getStatus(option))}></Tag>;
              }}
          />
      );
  };

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between">
       <span className="flex flex-wrap">
          <Link to='/project/create'>
            <Button 
              icon='pi pi-plus'
              label="Start a new project"
              severity="success"
               size="small"              
              />
          </Link> 
        </span>
        <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} 
            className="p-inputtext-sm" placeholder="Search..." />
        </span>
       
    </div>
  );

  return (
    <div className="card">
      {loading && <div className="text-center text-blue-500">
        <i className="pi pi-spin pi-spinner text-8xl"></i></div>}
       {!loading && projectList.length > 0 ?
            <DataTable value={projectList} size="small" editMode="row" dataKey="_id" 
            paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} globalFilter={globalFilter} header={header}
            onRowEditComplete={onRowEditComplete} tableStyle={{ minWidth: '25rem' }}>
                <Column field="name" header="Name" sortable editor={(options) => textEditor(options)}></Column>
                <Column field="description" header="Description" body={descriptionBodyTemplate} editor={(options) => textEditor(options)}></Column>
                <Column field="endDate" header="Due Date" body={parseDate} sortable></Column>
                <Column field="status" header="Status" body={statusBodyTemplate} sortable editor={(options) => statusEditor(options)}></Column>
                <Column field="_id" header="Comments" body={linkBodyTemplate}></Column>
                {(currentClient && currentClient.isAdmin) &&
                <Column rowEditor header="Edit" className="text-link"></Column>}
            </DataTable>
        : <div className="transition-delay-3000">
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
                  <p className='mb-2 py-2 px-4 text-center'>
                  You have no projects!
                </p>
          </div>
        }
         {error ? <Message severity="error" text={error.message}/> || 
             <Message severity="error" text="Something went wrong!"/> : null}
    </div>
  );
}